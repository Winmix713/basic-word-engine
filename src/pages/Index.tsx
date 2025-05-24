
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start building something amazing with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600">⚡ Fast Development</CardTitle>
              <CardDescription>
                Built with Vite for lightning-fast development experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-600">🎨 Beautiful UI</CardTitle>
              <CardDescription>
                Powered by Tailwind CSS and shadcn/ui components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600">🚀 Modern Stack</CardTitle>
              <CardDescription>
                React 18, TypeScript, and modern development tools
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="mr-4">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
