import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, ChevronDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import confetti from 'canvas-confetti';

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats can rotate their ears 180 degrees.",
  "The first cat show was held in 1871 at the Crystal Palace in London.",
];

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(0);

  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setProgress(0);
    }, 8000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, 80);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 overflow-x-hidden">
      <header ref={headerRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: backgroundY
          }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-8xl font-bold mb-6 text-white drop-shadow-lg"
            style={{ y: textY }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-3xl text-white drop-shadow-md mb-12"
            style={{ y: textY }}
          >
            Discover the enchanting world of cats
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={scrollToContent}
              className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
            >
              Explore More <ChevronDown className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </header>
      
      <main ref={contentRef} className="max-w-6xl mx-auto py-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg"
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-video">
                    <img 
                      src={src}
                      alt={`Adorable cat ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <motion.div 
                      className="absolute bottom-8 left-8 right-8 bg-white bg-opacity-90 p-6 rounded-lg"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold mb-4">Did you know?</h3>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentFactIndex}
                          className="text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {catFacts[currentFactIndex]}
                        </motion.p>
                      </AnimatePresence>
                      <Progress value={progress} className="mt-4" />
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLike}
            className="group relative text-2xl py-8 px-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Heart className="mr-3 h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            Like this cat! ({likeCount})
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
                >
                  <Alert className="w-64 bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white shadow-lg">
                    <Star className="h-5 w-5" />
                    <AlertTitle className="text-lg">Thanks for the love!</AlertTitle>
                    <AlertDescription>This cat appreciates you.</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="characteristics" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="characteristics" className="text-lg py-3">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds" className="text-lg py-3">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl text-purple-800">
                      <Info className="mr-3 h-8 w-8" />
                      Characteristics of Cats
                    </CardTitle>
                    <CardDescription className="text-lg text-purple-600">What makes cats truly special?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "Independent yet affectionate nature",
                        "Exceptional hunters with razor-sharp instincts",
                        "Incredibly flexible bodies and lightning-fast reflexes",
                        "Superior senses, particularly acute hearing and night vision",
                        "Complex communication through vocalizations, body language, and scent marking",
                      ].map((characteristic, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Paw className="mr-3 h-6 w-6 text-purple-600" />
                          <span className="text-lg">{characteristic}</span>
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
                <Card className="bg-gradient-to-br from-pink-100 to-purple-100 shadow-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl text-pink-800">
                      <Cat className="mr-3 h-8 w-8" />
                      Popular Cat Breeds
                    </CardTitle>
                    <CardDescription className="text-lg text-pink-600">Explore some of the world's most beloved cat breeds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <img src={breed.image} alt={breed.name} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                          <span className="text-xl font-semibold text-purple-800">{breed.name}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
