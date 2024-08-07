import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-purple-600 text-white py-20 px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the enchanting world of cats
          </motion.p>
        </div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <Paw 
              key={i} 
              className="text-white absolute" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}
        </motion.div>
      </header>
      
      <main className="max-w-6xl mx-auto py-16 px-8">
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Adorable cat" 
            className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
          />
          <motion.div 
            className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded-lg max-w-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-2">Did you know?</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {catFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
        
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLike}
            className="group relative"
          >
            <Heart className="mr-2 h-6 w-6 text-pink-500 group-hover:text-pink-600 transition-colors" />
            Like this cat! ({likeCount})
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                >
                  <Alert className="w-48">
                    <Star className="h-4 w-4" />
                    <AlertTitle>Thanks for the love!</AlertTitle>
                    <AlertDescription>This cat appreciates you.</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="mr-2 h-6 w-6" />
                    Characteristics of Cats
                  </CardTitle>
                  <CardDescription>What makes cats truly special?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Independent yet affectionate nature",
                      "Exceptional hunters with razor-sharp instincts",
                      "Incredibly flexible bodies and lightning-fast reflexes",
                      "Superior senses, particularly acute hearing and night vision",
                      "Complex communication through vocalizations, body language, and scent marking",
                    ].map((characteristic, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center bg-purple-100 p-3 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Paw className="mr-2 h-5 w-5 text-purple-600" />
                        {characteristic}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="breeds">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cat className="mr-2 h-6 w-6" />
                    Popular Cat Breeds
                  </CardTitle>
                  <CardDescription>Explore some of the world's most beloved cat breeds</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
                      { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
                      { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
                      { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
                      { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
                      { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
                    ].map((breed, index) => (
                      <motion.li 
                        key={index}
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <img src={breed.image} alt={breed.name} className="w-32 h-32 rounded-full mb-2 object-cover shadow-lg" />
                        <span className="font-semibold">{breed.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
