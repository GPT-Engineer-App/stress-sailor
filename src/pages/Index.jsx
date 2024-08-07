import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info } from "lucide-react";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-purple-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the enchanting world of cats
          </motion.p>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto py-16 px-8">
        <motion.img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
          alt="Adorable cat" 
          className="mx-auto object-cover w-full h-[500px] rounded-lg mb-12 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setLikeCount(prev => prev + 1)}
            className="group"
          >
            <Heart className="mr-2 h-6 w-6 text-pink-500 group-hover:text-pink-600 transition-colors" />
            Like this cat! ({likeCount})
          </Button>
        </div>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-6 w-6" />
                  Characteristics of Cats
                </CardTitle>
                <CardDescription>What makes cats truly special?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent yet affectionate nature</li>
                  <li>Exceptional hunters with razor-sharp instincts</li>
                  <li>Incredibly flexible bodies and lightning-fast reflexes</li>
                  <li>Superior senses, particularly acute hearing and night vision</li>
                  <li>Complex communication through vocalizations, body language, and scent marking</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cat className="mr-2 h-6 w-6" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription>Explore some of the world's most beloved cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Siamese" className="w-12 h-12 rounded-full mr-4" /> Siamese</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Persian" className="w-12 h-12 rounded-full mr-4" /> Persian</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Maine Coon" className="w-12 h-12 rounded-full mr-4" /> Maine Coon</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Bengal" className="w-12 h-12 rounded-full mr-4" /> Bengal</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="British Shorthair" className="w-12 h-12 rounded-full mr-4" /> British Shorthair</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
