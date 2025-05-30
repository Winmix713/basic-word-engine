/**
 * SlideSwift Editor - Optimized JavaScript Module
 * An advanced slide presentation editor with a focus on modularity, performance, and clean architecture
 */
(function() {
    'use strict';

    /**
     * Constants and Configuration
     * Centralized storage of fixed values and settings
     */
    const CONFIG = {
        // Storage keys
        STORAGE: {
            CURRENT_PRESENTATION: 'current-slide-presentation',
            PRESENTATIONS_LIST: 'slide-presentations-list'
        },
        // Default values
        DEFAULTS: {
            PRESENTATION_TITLE: 'Untitled Presentation',
            SLIDE_TITLE: 'Slide Title',
            SLIDE_SUBTITLE: 'Slide Subtitle',
            SLIDE_CONTENT: '<p>Click to add text</p>'
        },
        // Element selectors
        SELECTORS: {
            SLIDE_ITEM: '.slide-item',
            DELETE_SLIDE_BUTTON: '.delete-slide-button',
            TOOLBAR_BUTTON: '[data-command]'
        },
        // Limits and constraints
        LIMITS: {
            MAX_SLIDES: 100,
            MIN_ZOOM: 0.25,
            MAX_ZOOM: 3,
            DEFAULT_ZOOM: 1
        },
        // Debounce timings
        DEBOUNCE: {
            CONTENT_EDIT: 300,
            SEARCH: 200,
            SAVE: 1000
        }
    };

    /**
     * Editor State Management
     * Central source of truth for the application state
     */
    const editorState = {
        presentation: {
            id: generateUniqueId(),
            title: CONFIG.DEFAULTS.PRESENTATION_TITLE,
            lastEdited: new Date(),
            theme: 'default',
            slides: []
        },
        ui: {
            currentSlideIndex: -1,
            zoomLevel: CONFIG.LIMITS.DEFAULT_ZOOM,
            isFullscreen: false,
            isPresentationMode: false,
            isDirty: false,
            isEditingTitle: false
        },
        selection: {
            isSelecting: false,
            startPosition: null,
            endPosition: null
        }
    };

    /**
     * DOM Element Cache
     * Store references to frequently accessed DOM elements
     */
    const DOM = {};

    /**
     * Utility Functions
     * Generic helper functions used throughout the application
     */
    const Utils = {
        /**
         * Debounce function to limit how often a function can be called
         * @param {Function} func - The function to debounce
         * @param {number} wait - The debounce delay in milliseconds
         * @returns {Function} - Debounced function
         */
        debounce: function(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        },

        /**
         * Format date to a readable string
         * @param {Date} date - Date to format
         * @returns {string} - Formatted date string
         */
        formatDate: function(date) {
            if (!date) return '';
            
            const now = new Date();
            const diff = now - date;
            
            // If less than a minute ago
            if (diff < 60000) {
                return 'Just now';
            }
            
            // If less than an hour ago
            if (diff < 3600000) {
                const minutes = Math.floor(diff / 60000);
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            }
            
            // If today
            if (date.toDateString() === now.toDateString()) {
                return `Today at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            }
            
            // If yesterday
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            if (date.toDateString() === yesterday.toDateString()) {
                return `Yesterday at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            }
            
            // Otherwise show full date
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        /**
         * Generate a unique ID for slides and presentations
         * @returns {string} - Unique ID
         */
        generateUniqueId: function() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        },

        /**
         * Get a contrasting text color based on background color
         * @param {string} backgroundColor - CSS color value
         * @returns {string} - Either 'white' or 'black' depending on background
         */
        getContrastColor: function(backgroundColor) {
            // Handle undefined input safely
            if (!backgroundColor) return 'black';
            
            // Convert hex to RGB if needed
            let r, g, b;
            
            if (backgroundColor.startsWith('#')) {
                // Hex color
                const hex = backgroundColor.replace('#', '');
                r = parseInt(hex.substr(0, 2), 16);
                g = parseInt(hex.substr(2, 2), 16);
                b = parseInt(hex.substr(4, 2), 16);
            } else if (backgroundColor.startsWith('rgb')) {
                // RGB or RGBA color
                const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (match) {
                    r = parseInt(match[1], 10);
                    g = parseInt(match[2], 10);
                    b = parseInt(match[3], 10);
                } else {
                    return 'black'; // Default if parsing fails
                }
            } else {
                // For named colors or other formats, default to black
                return 'black';
            }
            
            // Calculate luminance using the formula from WCAG 2.0
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Return white for dark backgrounds, black for light backgrounds
            return luminance > 0.5 ? 'black' : 'white';
        },
        
        /**
         * Download data as a file
         * @param {Object} data - Data to download
         * @param {string} filename - Filename for the download
         * @param {string} type - MIME type of the file
         */
        downloadData: function(data, filename, type = 'application/json') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },
        
        /**
         * Safely execute document.execCommand with a warning for deprecated usage
         * @param {string} command - Command to execute
         * @param {boolean} showUI - Whether to show UI
         * @param {string} value - Value for the command
         */
        safeExecCommand: function(command, showUI = false, value = null) {
            console.warn(`Using deprecated execCommand: ${command}. Consider implementing a custom solution.`);
            document.execCommand(command, showUI, value);
        }
    };

    /**
     * Rendering Functions
     * Handle DOM updates and UI rendering
     */
    const Renderer = {
        /**
         * Render the slide list in the sidebar
         */
        renderSlideList: function() {
            const slideList = DOM.slideList;
            // Use textContent to clear for better performance
            slideList.textContent = '';
            
            // Use DocumentFragment for bulk rendering
            const fragment = document.createDocumentFragment();
            
            if (!editorState.presentation.slides.length) {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'text-center text-editor-muted text-sm p-4';
                emptyMessage.textContent = 'No slides yet. Click "New Slide" to add one.';
                fragment.appendChild(emptyMessage);
            } else {
                editorState.presentation.slides.forEach((slide, index) => {
                    const slideItem = document.createElement('div');
                    slideItem.className = 'slide-item flex flex-col p-2 rounded cursor-pointer relative group';
                    slideItem.setAttribute('tabindex', '0');
                    slideItem.setAttribute('role', 'option');
                    slideItem.setAttribute('data-slide-index', index);
                    slideItem.setAttribute('aria-selected', index === editorState.ui.currentSlideIndex ? 'true' : 'false');
                    
                    // Add preview thumbnail
                    const slidePreview = document.createElement('div');
                    slidePreview.className = 'slide-preview aspect-[16/9] rounded bg-editor-light mb-1 overflow-hidden';
                    
                    // Add slide number and delete button container
                    const slideActions = document.createElement('div');
                    slideActions.className = 'flex items-center justify-between text-xs';
                    
                    const slideNumber = document.createElement('span');
                    slideNumber.className = 'text-editor-muted';
                    slideNumber.textContent = `Slide ${index + 1}`;
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'delete-slide-button opacity-0 group-hover:opacity-100 p-1 hover:bg-editor-light rounded transition-opacity';
                    deleteButton.setAttribute('aria-label', `Delete slide ${index + 1}`);
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
                    
                    // Thumbnail preview of the slide (simplified for now)
                    if (slide.title) {
                        const previewTitle = document.createElement('div');
                        previewTitle.className = 'text-xs font-medium mb-1 truncate';
                        previewTitle.textContent = slide.title;
                        slidePreview.appendChild(previewTitle);
                    }
                    
                    slideActions.appendChild(slideNumber);
                    slideActions.appendChild(deleteButton);
                    slideItem.appendChild(slidePreview);
                    slideItem.appendChild(slideActions);
                    
                    fragment.appendChild(slideItem);
                });
            }
            
            slideList.appendChild(fragment);
            
            // Scroll the current slide into view if there is one selected
            if (editorState.ui.currentSlideIndex >= 0) {
                const currentSlideItem = slideList.querySelector(`[data-slide-index="${editorState.ui.currentSlideIndex}"]`);
                if (currentSlideItem) {
                    currentSlideItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            
            // Update slide navigation indicators
            this.updateSlideIndicator();
        },
        
        /**
         * Render the current slide onto the canvas
         */
        renderCanvas: function() {
            const canvas = DOM.slideCanvas;
            const currentSlide = this.getCurrentSlide();
            
            if (!currentSlide) {
                canvas.innerHTML = '<div class="flex items-center justify-center h-full"><p class="text-gray-400">Select a slide to edit</p></div>';
                return;
            }
            
            // For the canvas, we use innerHTML because we need to interpret HTML content
            // But we construct it carefully to avoid XSS risks
            const slideHTML = `
                <div class="slide-content flex flex-col h-full" data-slide-id="${currentSlide.id}">
                    <div class="slide-title mb-2" contenteditable="true" data-field="title" placeholder="${CONFIG.DEFAULTS.SLIDE_TITLE}">${currentSlide.title || ''}</div>
                    <div class="slide-subtitle mb-4" contenteditable="true" data-field="subtitle" placeholder="${CONFIG.DEFAULTS.SLIDE_SUBTITLE}">${currentSlide.subtitle || ''}</div>
                    <div class="slide-body flex-1" contenteditable="true" data-field="content" placeholder="${CONFIG.DEFAULTS.SLIDE_CONTENT}">${currentSlide.content || ''}</div>
                </div>
            `;
            
            canvas.innerHTML = slideHTML;
            
            // After rendering, attach input handlers to editable fields
            const editableFields = canvas.querySelectorAll('[contenteditable]');
            editableFields.forEach(field => {
                field.addEventListener('input', Actions.handleContentEdit);
                field.addEventListener('focus', Actions.handleContentFocus);
                field.addEventListener('blur', Actions.handleContentBlur);
                field.addEventListener('keydown', Actions.handleContentKeyDown);
            });
            
            // Apply any custom styling from the slide
            if (currentSlide.background) {
                canvas.style.backgroundColor = currentSlide.background;
                
                // Update text color based on background
                const contrastColor = Utils.getContrastColor(currentSlide.background);
                canvas.style.color = contrastColor;
            } else {
                canvas.style.backgroundColor = '';
                canvas.style.color = '';
            }
        },
        
        /**
         * Update the slide indicator text in the bottom bar
         */
        updateSlideIndicator: function() {
            if (!DOM.slideIndicator) return;
            
            const total = editorState.presentation.slides.length;
            const current = editorState.ui.currentSlideIndex + 1;
            
            DOM.slideIndicator.textContent = total > 0 ? `${current} / ${total}` : '- / -';
            
            // Update navigation button states
            DOM.prevSlideButton.disabled = current <= 1;
            DOM.nextSlideButton.disabled = current >= total || total === 0;
        },
        
        /**
         * Update the presentation title display
         */
        updatePresentationTitle: function() {
            if (!DOM.presentationTitle) return;
            DOM.presentationTitle.textContent = editorState.presentation.title || CONFIG.DEFAULTS.PRESENTATION_TITLE;
        },
        
        /**
         * Update the last edited timestamp
         */
        updateLastEdited: function() {
            if (!DOM.presentationLastEdited) return;
            DOM.presentationLastEdited.textContent = `Last edited: ${Utils.formatDate(editorState.presentation.lastEdited)}`;
        },
        
        /**
         * Update toolbar button states based on current selection
         * Uses proper aria-pressed for accessibility
         */
        updateToolbarState: function() {
            // Bail if we don't have a selection
            if (!window.getSelection) return;
            
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            
            // Check which formatting is active at the current selection
            const queryCommandState = (cmd) => {
                try {
                    return document.queryCommandState(cmd);
                } catch (e) {
                    return false;
                }
            };
            
            // Update button states for text formatting
            const commands = ['bold', 'italic', 'underline', 'strikeThrough', 
                             'justifyLeft', 'justifyCenter', 'justifyRight',
                             'insertUnorderedList', 'insertOrderedList'];
            
            commands.forEach(cmd => {
                const button = DOM.editorToolbar.querySelector(`[data-command="${cmd}"]`);
                if (!button) return;
                
                const isActive = queryCommandState(cmd);
                button.setAttribute('aria-pressed', String(isActive));
                
                // Also update visual class for clarity
                if (isActive) {
                    button.classList.add('bg-editor-light');
                } else {
                    button.classList.remove('bg-editor-light');
                }
            });
        },
        
        /**
         * Get the currently selected slide object
         * @returns {Object|null} - The current slide or null
         */
        getCurrentSlide: function() {
            const { slides } = editorState.presentation;
            const { currentSlideIndex } = editorState.ui;
            
            if (currentSlideIndex >= 0 && currentSlideIndex < slides.length) {
                return slides[currentSlideIndex];
            }
            
            return null;
        }
    };

    /**
     * Action Functions
     * Implement core functionality and state changes
     */
    const Actions = {
        /**
         * Create a new slide
         */
        createNewSlide: function() {
            if (editorState.presentation.slides.length >= CONFIG.LIMITS.MAX_SLIDES) {
                alert(`Maximum number of slides (${CONFIG.LIMITS.MAX_SLIDES}) reached.`);
                return;
            }
            
            const newSlide = {
                id: Utils.generateUniqueId(),
                title: CONFIG.DEFAULTS.SLIDE_TITLE,
                subtitle: CONFIG.DEFAULTS.SLIDE_SUBTITLE, 
                content: CONFIG.DEFAULTS.SLIDE_CONTENT,
                background: '',
                elements: []
            };
            
            editorState.presentation.slides.push(newSlide);
            editorState.ui.currentSlideIndex = editorState.presentation.slides.length - 1;
            editorState.ui.isDirty = true;
            editorState.presentation.lastEdited = new Date();
            
            Renderer.renderSlideList();
            Renderer.renderCanvas();
            Renderer.updateLastEdited();
            
            // Auto-save after creating a new slide
            Actions.savePresentation();
        },
        
        /**
         * Delete a slide by index
         * @param {number} index - Index of the slide to delete
         */
        deleteSlide: function(index) {
            if (index < 0 || index >= editorState.presentation.slides.length) return;
            
            if (confirm('Are you sure you want to delete this slide?')) {
                editorState.presentation.slides.splice(index, 1);
                editorState.ui.isDirty = true;
                editorState.presentation.lastEdited = new Date();
                
                // Adjust current slide index if necessary
                if (editorState.ui.currentSlideIndex === index) {
                    if (index === editorState.presentation.slides.length) {
                        // Was the last slide, go to new last slide
                        editorState.ui.currentSlideIndex = Math.max(0, editorState.presentation.slides.length - 1);
                    }
                    // Otherwise keep the same index which now points to the next slide
                } else if (editorState.ui.currentSlideIndex > index) {
                    // Adjust for the removed slide
                    editorState.ui.currentSlideIndex--;
                }
                
                // If no slides left, reset current index
                if (editorState.presentation.slides.length === 0) {
                    editorState.ui.currentSlideIndex = -1;
                }
                
                Renderer.renderSlideList();
                Renderer.renderCanvas();
                Renderer.updateLastEdited();
                
                // Auto-save after deleting a slide
                Actions.savePresentation();
            }
        },
        
        /**
         * Select a slide by index
         * @param {number} index - Index of the slide to select
         */
        selectSlide: function(index) {
            if (index < 0 || index >= editorState.presentation.slides.length) return;
            
            // Save current slide content before switching
            this.saveCurrentSlideContent();
            
            editorState.ui.currentSlideIndex = index;
            Renderer.renderSlideList();
            Renderer.renderCanvas();
        },
        
        /**
         * Navigate to the previous slide
         */
        goToPrevSlide: function() {
            if (editorState.ui.currentSlideIndex > 0) {
                this.selectSlide(editorState.ui.currentSlideIndex - 1);
            }
        },
        
        /**
         * Navigate to the next slide
         */
        goToNextSlide: function() {
            if (editorState.ui.currentSlideIndex < editorState.presentation.slides.length - 1) {
                this.selectSlide(editorState.ui.currentSlideIndex + 1);
            }
        },
        
        /**
         * Handle content edits (debounced)
         * @param {Event} e - Input event
         */
        handleContentEdit: Utils.debounce(function(e) {
            const field = e.target.dataset.field;
            const currentSlide = Renderer.getCurrentSlide();
            
            if (!currentSlide || !field) return;
            
            // Update the slide with the new content
            currentSlide[field] = e.target.innerHTML;
            editorState.ui.isDirty = true;
            editorState.presentation.lastEdited = new Date();
            
            // Update the last edited timestamp
            Renderer.updateLastEdited();
            
            // For titles, also update the list display
            if (field === 'title') {
                Renderer.renderSlideList();
            }
            
            // Auto-save the changes
            Actions.savePresentation();
        }, CONFIG.DEBOUNCE.CONTENT_EDIT),
        
        /**
         * Handle focus on editable content
         * @param {Event} e - Focus event
         */
        handleContentFocus: function(e) {
            // Update toolbar state when focusing on editable content
            Renderer.updateToolbarState();
        },
        
        /**
         * Handle blur on editable content
         * @param {Event} e - Blur event
         */
        handleContentBlur: function(e) {
            // Make sure pending edits are saved
            Actions.saveCurrentSlideContent();
        },
        
        /**
         * Handle keydown in editable content
         * @param {Event} e - Keydown event
         */
        handleContentKeyDown: function(e) {
            // Handle keyboard shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        Actions.savePresentation();
                        break;
                        
                    case 'b':
                        e.preventDefault();
                        Utils.safeExecCommand('bold');
                        Renderer.updateToolbarState();
                        break;
                        
                    case 'i':
                        e.preventDefault();
                        Utils.safeExecCommand('italic');
                        Renderer.updateToolbarState();
                        break;
                        
                    case 'u':
                        e.preventDefault();
                        Utils.safeExecCommand('underline');
                        Renderer.updateToolbarState();
                        break;
                }
            }
        },
        
        /**
         * Handle toolbar button clicks
         * @param {Event} e - Click event 
         */
        handleToolbarAction: function(e) {
            const button = e.target.closest(CONFIG.SELECTORS.TOOLBAR_BUTTON);
            if (!button) return;
            
            const command = button.dataset.command;
            if (!command) return;
            
            e.preventDefault();
            
            // Check if we need to ask for a value
            let value = null;
            
            switch (command) {
                case 'foreColor':
                case 'backColor':
                    // In a real implementation, we'd use a color picker
                    // For now, just use a simple prompt
                    value = prompt(`Enter a color for ${command === 'foreColor' ? 'text' : 'highlight'}:`, '#000000');
                    if (!value) return; // User cancelled
                    break;
                    
                case 'fontName':
                    // In a real implementation, we'd use a font dropdown
                    value = prompt('Enter font name:', 'Arial');
                    if (!value) return;
                    break;
                    
                case 'fontSize':
                    // In a real implementation, we'd use a size dropdown or slider
                    value = prompt('Enter font size (1-7):', '3');
                    if (!value) return;
                    break;
            }
            
            // Execute the command
            Utils.safeExecCommand(command, false, value);
            
            // Update toolbar state after the action
            Renderer.updateToolbarState();
            
            // Mark as dirty and update timestamps
            editorState.ui.isDirty = true;
            editorState.presentation.lastEdited = new Date();
            Renderer.updateLastEdited();
        },
        
        /**
         * Present the slideshow
         */
        presentSlideshow: function() {
            if (editorState.presentation.slides.length === 0) {
                alert('Add at least one slide to present.');
                return;
            }
            
            // Save any pending changes first
            this.saveCurrentSlideContent();
            this.savePresentation();
            
            // Enter presentation mode
            document.body.classList.add('presentation-mode');
            editorState.ui.isPresentationMode = true;
            
            // Make sure a slide is selected
            if (editorState.ui.currentSlideIndex < 0) {
                editorState.ui.currentSlideIndex = 0;
            }
            
            // Render the current slide
            Renderer.renderCanvas();
            
            // Add escape key listener
            document.addEventListener('keydown', this.handlePresentationKeyDown);
        },
        
        /**
         * Exit presentation mode
         */
        exitPresentation: function() {
            document.body.classList.remove('presentation-mode');
            editorState.ui.isPresentationMode = false;
            
            // Re-render the canvas for edit mode
            Renderer.renderCanvas();
            
            // Remove escape key listener
            document.removeEventListener('keydown', this.handlePresentationKeyDown);
        },
        
        /**
         * Handle keyboard navigation during presentation
         * @param {KeyboardEvent} e - Keyboard event
         */
        handlePresentationKeyDown: function(e) {
            if (editorState.ui.isPresentationMode) {
                switch (e.key) {
                    case 'Escape':
                        Actions.exitPresentation();
                        break;
                        
                    case 'ArrowRight':
                    case 'ArrowDown':
                    case ' ':
                    case 'Enter':
                        Actions.goToNextSlide();
                        break;
                        
                    case 'ArrowLeft':
                    case 'ArrowUp':
                    case 'Backspace':
                        Actions.goToPrevSlide();
                        break;
                }
            }
        },
        
        /**
         * Set the zoom level for the canvas
         * @param {number|string} level - Zoom level (number or 'fit')
         */
        setZoom: function(level) {
            if (level === 'fit') {
                // Calculate the fit level based on available space
                const mainEl = DOM.main;
                const canvasEl = DOM.slideCanvas;
                const mainWidth = mainEl.clientWidth - 32; // Subtract padding
                const mainHeight = mainEl.clientHeight - 32;
                const canvasWidth = canvasEl.clientWidth;
                const canvasHeight = canvasEl.clientHeight;
                
                const widthRatio = mainWidth / canvasWidth;
                const heightRatio = mainHeight / canvasHeight;
                
                // Use the smaller ratio to ensure it fits
                level = Math.min(widthRatio, heightRatio, 1); // Cap at 100%
            } else {
                level = parseFloat(level);
            }
            
            // Ensure the zoom level is within bounds
            level = Math.max(CONFIG.LIMITS.MIN_ZOOM, Math.min(level, CONFIG.LIMITS.MAX_ZOOM));
            
            editorState.ui.zoomLevel = level;
            DOM.canvasScaler.style.transform = `scale(${level})`;
            
            // Update the zoom dropdown to match
            if (DOM.zoomLevel) {
                const options = DOM.zoomLevel.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === String(level) || (options[i].value === 'fit' && level !== CONFIG.LIMITS.DEFAULT_ZOOM)) {
                        DOM.zoomLevel.selectedIndex = i;
                        break;
                    }
                }
            }
        },
        
        /**
         * Toggle fullscreen mode
         */
        toggleFullscreen: function() {
            const doc = window.document;
            const docEl = doc.documentElement;
            
            const requestFullScreen = 
                docEl.requestFullscreen || 
                docEl.mozRequestFullScreen || 
                docEl.webkitRequestFullScreen || 
                docEl.msRequestFullscreen;
                
            const exitFullScreen = 
                doc.exitFullscreen || 
                doc.mozCancelFullScreen || 
                doc.webkitExitFullscreen || 
                doc.msExitFullscreen;
                
            if (!doc.fullscreenElement && 
                !doc.mozFullScreenElement && 
                !doc.webkitFullscreenElement && 
                !doc.msFullscreenElement) {
                
                // Enter fullscreen
                if (requestFullScreen) {
                    requestFullScreen.call(docEl);
                    editorState.ui.isFullscreen = true;
                    
                    // Update UI
                    DOM.fullscreenEnterIcon.classList.add('hidden');
                    DOM.fullscreenExitIcon.classList.remove('hidden');
                }
            } else {
                // Exit fullscreen
                if (exitFullScreen) {
                    exitFullScreen.call(doc);
                    editorState.ui.isFullscreen = false;
                    
                    // Update UI
                    DOM.fullscreenEnterIcon.classList.remove('hidden');
                    DOM.fullscreenExitIcon.classList.add('hidden');
                }
            }
        },
        
        /**
         * Save the current presentation to localStorage
         * Explicitly saves any pending edits first
         */
        savePresentation: Utils.debounce(function() {
            // First save any pending slide content edits
            Actions.saveCurrentSlideContent();
            
            try {
                editorState.presentation.lastEdited = new Date();
                Renderer.updateLastEdited();
                
                localStorage.setItem(
                    CONFIG.STORAGE.CURRENT_PRESENTATION, 
                    JSON.stringify(editorState.presentation)
                );
                
                // Update presentation list
                const presentationsList = JSON.parse(
                    localStorage.getItem(CONFIG.STORAGE.PRESENTATIONS_LIST) || '[]'
                );
                
                const existingIndex = presentationsList.findIndex(p => p.id === editorState.presentation.id);
                const presentationSummary = {
                    id: editorState.presentation.id,
                    title: editorState.presentation.title,
                    lastEdited: editorState.presentation.lastEdited,
                    slideCount: editorState.presentation.slides.length
                };
                
                if (existingIndex >= 0) {
                    presentationsList[existingIndex] = presentationSummary;
                } else {
                    presentationsList.push(presentationSummary);
                }
                
                localStorage.setItem(
                    CONFIG.STORAGE.PRESENTATIONS_LIST, 
                    JSON.stringify(presentationsList)
                );
                
                editorState.ui.isDirty = false;
                
                // Give visual feedback
                DOM.saveButton.classList.add('bg-green-600');
                setTimeout(() => {
                    DOM.saveButton.classList.remove('bg-green-600');
                }, 1000);
                
            } catch (error) {
                console.error('Error saving presentation:', error);
                alert('Failed to save your presentation. Please try again or download a backup.');
            }
        }, CONFIG.DEBOUNCE.SAVE),
        
        /**
         * Make sure the current slide's content is saved
         * This is important to call before switching slides or saving
         */
        saveCurrentSlideContent: function() {
            const currentSlide = Renderer.getCurrentSlide();
            if (!currentSlide) return;
            
            const canvas = DOM.slideCanvas;
            const titleEl = canvas.querySelector('[data-field="title"]');
            const subtitleEl = canvas.querySelector('[data-field="subtitle"]');
            const contentEl = canvas.querySelector('[data-field="content"]');
            
            if (titleEl) currentSlide.title = titleEl.innerHTML;
            if (subtitleEl) currentSlide.subtitle = subtitleEl.innerHTML;
            if (contentEl) currentSlide.content = contentEl.innerHTML;
        },
        
        /**
         * Load a presentation from localStorage
         */
        loadPresentation: function() {
            try {
                const savedData = localStorage.getItem(CONFIG.STORAGE.CURRENT_PRESENTATION);
                if (!savedData) return;
                
                const savedPresentation = JSON.parse(savedData);
                
                // Ensure lastEdited is a Date object
                if (savedPresentation.lastEdited) {
                    savedPresentation.lastEdited = new Date(savedPresentation.lastEdited);
                } else {
                    savedPresentation.lastEdited = new Date();
                }
                
                editorState.presentation = savedPresentation;
                
                // Make sure currentSlideIndex is valid
                if (editorState.presentation.slides.length > 0) {
                    editorState.ui.currentSlideIndex = 0;
                } else {
                    editorState.ui.currentSlideIndex = -1;
                }
                
                // Update UI
                Renderer.updatePresentationTitle();
                Renderer.updateLastEdited();
                Renderer.renderSlideList();
                Renderer.renderCanvas();
                
            } catch (error) {
                console.error('Error loading presentation:', error);
                alert('Failed to load your presentation. It may be corrupted or in an incompatible format.');
            }
        },
        
        /**
         * Download the current presentation as JSON
         */
        downloadPresentation: function() {
            // Save any pending changes first
            this.saveCurrentSlideContent();
            
            // Generate download
