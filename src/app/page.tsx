"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Home, BarChart3, Settings, ChefHat, Flame, TrendingUp, Calendar, Award, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NutritionInfo {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  time: string;
}

interface LowCarbMeal {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  ingredients: string[];
  preparation: string[];
  image: string;
}

const lowCarbMeals: LowCarbMeal[] = [
  {
    id: 1,
    name: "Omelete de Espinafre",
    calories: 220,
    carbs: 3,
    protein: 18,
    fat: 15,
    ingredients: ["3 ovos", "1 xícara de espinafre", "Queijo cottage", "Azeite"],
    preparation: [
      "Bata os ovos em uma tigela",
      "Refogue o espinafre no azeite até murchar",
      "Despeje os ovos na frigideira",
      "Adicione o queijo cottage por cima",
      "Dobre ao meio quando firmar"
    ],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Frango Grelhado com Brócolis",
    calories: 280,
    carbs: 8,
    protein: 35,
    fat: 12,
    ingredients: ["150g peito de frango", "1 xícara brócolis", "Alho", "Limão"],
    preparation: [
      "Tempere o frango com alho, sal e limão",
      "Grelhe o frango por 6-8 minutos de cada lado",
      "Cozinhe o brócolis no vapor por 5 minutos",
      "Refogue o brócolis com alho",
      "Sirva o frango fatiado com o brócolis"
    ],
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Salada de Atum",
    calories: 250,
    carbs: 5,
    protein: 30,
    fat: 14,
    ingredients: ["1 lata atum", "Alface", "Tomate", "Azeite", "Limão"],
    preparation: [
      "Escorra o atum e coloque em uma tigela",
      "Lave e rasgue a alface",
      "Corte o tomate em cubos",
      "Misture todos os ingredientes",
      "Tempere com azeite, limão e sal"
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Salmão com Aspargos",
    calories: 320,
    carbs: 6,
    protein: 28,
    fat: 22,
    ingredients: ["150g salmão", "Aspargos", "Manteiga", "Ervas"],
    preparation: [
      "Tempere o salmão com sal, pimenta e ervas",
      "Aqueça a manteiga em uma frigideira",
      "Grelhe o salmão por 4 minutos de cada lado",
      "Refogue os aspargos na mesma frigideira",
      "Sirva o salmão sobre os aspargos"
    ],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Carne Moída com Abobrinha",
    calories: 290,
    carbs: 7,
    protein: 32,
    fat: 16,
    ingredients: ["150g carne moída", "2 abobrinhas", "Cebola", "Tomate"],
    preparation: [
      "Refogue a cebola picada no azeite",
      "Adicione a carne moída e cozinhe até dourar",
      "Corte as abobrinhas em cubos",
      "Adicione abobrinha e tomate picado",
      "Cozinhe por 10 minutos até a abobrinha amolecer"
    ],
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Wrap de Alface com Frango",
    calories: 200,
    carbs: 4,
    protein: 25,
    fat: 10,
    ingredients: ["Folhas alface", "100g frango desfiado", "Abacate", "Tomate"],
    preparation: [
      "Lave e seque as folhas de alface",
      "Desfie o frango cozido",
      "Corte o abacate e tomate em fatias",
      "Coloque o frango no centro da folha",
      "Adicione abacate e tomate, enrole como um wrap"
    ],
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Ovos Mexidos com Cogumelos",
    calories: 210,
    carbs: 5,
    protein: 16,
    fat: 14,
    ingredients: ["3 ovos", "Cogumelos", "Cebola", "Manteiga"],
    preparation: [
      "Fatie os cogumelos e pique a cebola",
      "Refogue a cebola e cogumelos na manteiga",
      "Bata os ovos em uma tigela",
      "Despeje os ovos na frigideira",
      "Mexa constantemente até ficarem cremosos"
    ],
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Tilápia ao Forno",
    calories: 240,
    carbs: 3,
    protein: 30,
    fat: 12,
    ingredients: ["150g tilápia", "Limão", "Alho", "Ervas"],
    preparation: [
      "Pré-aqueça o forno a 200°C",
      "Tempere a tilápia com alho, limão e ervas",
      "Coloque em uma assadeira untada",
      "Asse por 15-20 minutos",
      "Sirva com rodelas de limão"
    ],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Salada Caesar Low Carb",
    calories: 260,
    carbs: 6,
    protein: 22,
    fat: 18,
    ingredients: ["Alface romana", "Frango grelhado", "Parmesão", "Molho caesar"],
    preparation: [
      "Lave e rasgue a alface romana",
      "Grelhe e fatie o frango",
      "Rale o queijo parmesão",
      "Misture a alface com o molho caesar",
      "Adicione o frango e o parmesão por cima"
    ],
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Hambúrguer sem Pão",
    calories: 310,
    carbs: 4,
    protein: 28,
    fat: 22,
    ingredients: ["150g carne", "Queijo", "Alface", "Tomate", "Picles"],
    preparation: [
      "Modele a carne em formato de hambúrguer",
      "Grelhe por 4-5 minutos de cada lado",
      "Adicione o queijo no último minuto",
      "Monte com alface como base",
      "Adicione tomate, picles e o hambúrguer"
    ],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Camarão com Alho",
    calories: 230,
    carbs: 5,
    protein: 26,
    fat: 12,
    ingredients: ["200g camarão", "Alho", "Azeite", "Limão"],
    preparation: [
      "Limpe e descasque os camarões",
      "Pique o alho finamente",
      "Aqueça o azeite e refogue o alho",
      "Adicione os camarões e cozinhe por 3-4 minutos",
      "Finalize com suco de limão"
    ],
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Berinjela Recheada",
    calories: 270,
    carbs: 9,
    protein: 20,
    fat: 18,
    ingredients: ["1 berinjela", "Carne moída", "Queijo", "Tomate"],
    preparation: [
      "Corte a berinjela ao meio e retire a polpa",
      "Refogue a carne moída com tomate",
      "Pique a polpa da berinjela e adicione à carne",
      "Recheie as cascas da berinjela",
      "Cubra com queijo e asse por 25 minutos a 180°C"
    ],
    image: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400&h=300&fit=crop"
  },
  {
    id: 13,
    name: "Frango ao Curry",
    calories: 290,
    carbs: 7,
    protein: 32,
    fat: 16,
    ingredients: ["150g frango", "Curry", "Leite de coco", "Espinafre"],
    preparation: [
      "Corte o frango em cubos",
      "Refogue o frango até dourar",
      "Adicione o curry em pó",
      "Despeje o leite de coco",
      "Adicione o espinafre e cozinhe por 10 minutos"
    ],
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Atum Selado",
    calories: 260,
    carbs: 3,
    protein: 35,
    fat: 12,
    ingredients: ["150g atum fresco", "Gergelim", "Shoyu", "Gengibre"],
    preparation: [
      "Tempere o atum com shoyu e gengibre ralado",
      "Cubra o atum com gergelim",
      "Aqueça uma frigideira em fogo alto",
      "Sele o atum por 1 minuto de cada lado",
      "Fatie e sirva imediatamente"
    ],
    image: "https://images.unsplash.com/photo-1580959375944-57c8e2aa9b3d?w=400&h=300&fit=crop"
  },
  {
    id: 15,
    name: "Couve-flor Gratinada",
    calories: 240,
    carbs: 8,
    protein: 18,
    fat: 16,
    ingredients: ["Couve-flor", "Queijo", "Creme de leite", "Bacon"],
    preparation: [
      "Cozinhe a couve-flor no vapor por 8 minutos",
      "Frite o bacon até ficar crocante",
      "Misture o creme de leite com metade do queijo",
      "Coloque a couve-flor em um refratário",
      "Cubra com o creme, queijo e bacon, gratine por 15 minutos"
    ],
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop"
  },
  {
    id: 16,
    name: "Peito de Peru com Queijo",
    calories: 220,
    carbs: 4,
    protein: 28,
    fat: 10,
    ingredients: ["150g peito peru", "Queijo mussarela", "Tomate", "Manjericão"],
    preparation: [
      "Tempere o peito de peru com sal e pimenta",
      "Grelhe por 5 minutos de cada lado",
      "Adicione fatias de queijo por cima",
      "Cubra até o queijo derreter",
      "Sirva com tomate e manjericão fresco"
    ],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
  },
  {
    id: 17,
    name: "Espetinho de Carne",
    calories: 300,
    carbs: 5,
    protein: 30,
    fat: 18,
    ingredients: ["150g carne", "Pimentão", "Cebola", "Temperos"],
    preparation: [
      "Corte a carne, pimentão e cebola em cubos",
      "Tempere a carne com seus temperos favoritos",
      "Monte os espetinhos alternando carne e legumes",
      "Grelhe por 10-12 minutos virando ocasionalmente",
      "Sirva quente"
    ],
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop"
  },
  {
    id: 18,
    name: "Sopa de Legumes",
    calories: 180,
    carbs: 12,
    protein: 8,
    fat: 8,
    ingredients: ["Abobrinha", "Cenoura", "Caldo", "Frango desfiado"],
    preparation: [
      "Corte os legumes em cubos pequenos",
      "Refogue os legumes em azeite",
      "Adicione o caldo de galinha",
      "Cozinhe por 15 minutos",
      "Adicione o frango desfiado e sirva"
    ],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
  },
  {
    id: 19,
    name: "Ovo Cozido com Abacate",
    calories: 250,
    carbs: 6,
    protein: 14,
    fat: 20,
    ingredients: ["2 ovos", "1/2 abacate", "Sal", "Pimenta"],
    preparation: [
      "Cozinhe os ovos por 8 minutos",
      "Descasque e corte os ovos ao meio",
      "Amasse o abacate com sal e pimenta",
      "Coloque o abacate sobre os ovos",
      "Sirva imediatamente"
    ],
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop"
  },
  {
    id: 20,
    name: "Frango com Pesto",
    calories: 310,
    carbs: 5,
    protein: 34,
    fat: 18,
    ingredients: ["150g frango", "Pesto", "Tomate seco", "Rúcula"],
    preparation: [
      "Tempere e grelhe o frango",
      "Espalhe o pesto sobre o frango grelhado",
      "Pique o tomate seco",
      "Adicione o tomate seco por cima",
      "Sirva sobre uma cama de rúcula"
    ],
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop"
  }
];

interface WeeklyData {
  day: string;
  calories: number;
}

// Função para obter o dia da semana atual
const getCurrentDayIndex = () => {
  const today = new Date().getDay(); // 0 = Domingo, 1 = Segunda, etc.
  // Ajusta para começar na segunda-feira (0 = Seg, 1 = Ter, ..., 6 = Dom)
  return today === 0 ? 6 : today - 1;
};

const weeklyData: WeeklyData[] = [
  { day: "Seg", calories: 0 },
  { day: "Ter", calories: 0 },
  { day: "Qua", calories: 0 },
  { day: "Qui", calories: 0 },
  { day: "Sex", calories: 0 },
  { day: "Sáb", calories: 0 },
  { day: "Dom", calories: 0 }
];

export default function FitlyNutrim() {
  const [activeView, setActiveView] = useState<"home" | "recipes" | "analytics" | "settings">("home");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recentUploads, setRecentUploads] = useState<NutritionInfo[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);
  const [dailyFat, setDailyFat] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(2000);
  const [activeDays, setActiveDays] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<LowCarbMeal | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para cálculo de nutrição
  const [currentWeight, setCurrentWeight] = useState("");
  const [height, setHeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [calculatedNutrition, setCalculatedNutrition] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  // Relógio e reset de calorias à meia-noite
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const previousTime = currentTime;
      
      setCurrentTime(now);
      
      // Verifica se mudou de dia (passou da meia-noite)
      if (
        previousTime.getDate() !== now.getDate() ||
        (now.getHours() === 0 && now.getMinutes() === 0 && previousTime.getHours() === 23)
      ) {
        // Zera as calorias e macros
        setDailyCalories(0);
        setDailyProtein(0);
        setDailyCarbs(0);
        setDailyFat(0);
        setRecentUploads([]);
      }
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(timer);
  }, [currentTime]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (imageUrl: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockFoods = [
        { food: "Frango Grelhado", calories: 320, protein: 35, carbs: 8, fat: 15 },
        { food: "Salada Caesar", calories: 280, protein: 22, carbs: 12, fat: 18 },
        { food: "Salmão com Legumes", calories: 380, protein: 28, carbs: 10, fat: 24 },
        { food: "Omelete de Queijo", calories: 250, protein: 18, carbs: 4, fat: 18 }
      ];
      
      const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const newUpload: NutritionInfo = {
        ...randomFood,
        image: imageUrl,
        time: timeStr
      };
      
      setRecentUploads(prev => [newUpload, ...prev].slice(0, 5));
      setDailyCalories(prev => prev + randomFood.calories);
      setDailyProtein(prev => prev + randomFood.protein);
      setDailyCarbs(prev => prev + randomFood.carbs);
      setDailyFat(prev => prev + randomFood.fat);
      setIsAnalyzing(false);
      setSelectedImage(null);
    }, 2000);
  };

  const calculateNutrition = () => {
    const weight = parseFloat(currentWeight);
    const heightCm = parseFloat(height);
    const target = parseFloat(targetWeight);

    if (!weight || !heightCm || !target) {
      return;
    }

    // Cálculo do TMB (Taxa Metabólica Basal) usando fórmula de Mifflin-St Jeor
    // Assumindo idade média de 30 anos e sexo masculino (pode ser ajustado)
    const heightM = heightCm / 100;
    const tmb = 10 * weight + 6.25 * heightCm - 5 * 30 + 5;

    // Déficit calórico para emagrecimento (20% abaixo do TMB com atividade leve)
    const tdee = tmb * 1.375; // Fator de atividade leve
    const caloriesForWeightLoss = Math.round(tdee * 0.8); // 20% de déficit

    // Cálculo de macronutrientes
    // Proteína: 2g por kg de peso corporal (importante para preservar massa muscular)
    const protein = Math.round(weight * 2);

    // Gordura: 25% das calorias totais
    const fatCalories = caloriesForWeightLoss * 0.25;
    const fat = Math.round(fatCalories / 9); // 9 calorias por grama de gordura

    // Carboidratos: restante das calorias
    const proteinCalories = protein * 4; // 4 calorias por grama de proteína
    const remainingCalories = caloriesForWeightLoss - proteinCalories - fatCalories;
    const carbs = Math.round(remainingCalories / 4); // 4 calorias por grama de carboidrato

    setCalculatedNutrition({
      calories: caloriesForWeightLoss,
      protein,
      carbs,
      fat
    });

    // Atualiza a meta diária na página inicial
    setCaloriesGoal(caloriesForWeightLoss);
  };

  const caloriesRemaining = caloriesGoal - dailyCalories;
  const caloriesPercentage = Math.min((dailyCalories / caloriesGoal) * 100, 100);
  
  // Calcula porcentagens dos macros baseado no consumido vs meta
  const proteinGoal = calculatedNutrition?.protein || 65;
  const carbsGoal = calculatedNutrition?.carbs || 90;
  const fatGoal = calculatedNutrition?.fat || 48;
  
  const proteinPercentage = Math.min((dailyProtein / proteinGoal) * 100, 100);
  const carbsPercentage = Math.min((dailyCarbs / carbsGoal) * 100, 100);
  const fatPercentage = Math.min((dailyFat / fatGoal) * 100, 100);

  const maxCalories = Math.max(...weeklyData.map(d => d.calories), 1);
  const avgCalories = Math.round(weeklyData.reduce((sum, d) => sum + d.calories, 0) / weeklyData.length);

  // Obtém o índice do dia atual
  const currentDayIndex = getCurrentDayIndex();

  // Formata o horário atual
  const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 p-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">Fitly Nutrim</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <span className="text-xs">🔔</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {activeView === "home" && (
          <div className="space-y-6">
            {/* Day Toggle */}
            <div className="flex gap-2 justify-center">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium shadow-md hover:bg-blue-600 transition-colors">
                Hoje
              </button>
              <button className="px-6 py-2 bg-white text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                Ontem
              </button>
            </div>

            {/* Calories Remaining */}
            <Card className="bg-white border-blue-100 p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#E0E7FF"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${caloriesPercentage * 4.4} 440`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">{Math.abs(caloriesRemaining)}</span>
                    <span className="text-xs text-gray-500">kcal {caloriesRemaining >= 0 ? 'restantes' : 'excedidas'}</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Meta Diária: {caloriesGoal} kcal</p>
                </div>
              </div>
            </Card>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-white border-blue-100 p-4 shadow-md">
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#E0E7FF" strokeWidth="6" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#3B82F6"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${proteinPercentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{Math.round(proteinPercentage)}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Proteína</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {dailyProtein}g / {proteinGoal}g
                  </span>
                </div>
              </Card>

              <Card className="bg-white border-blue-100 p-4 shadow-md">
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#E0E7FF" strokeWidth="6" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#60A5FA"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${carbsPercentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-500">{Math.round(carbsPercentage)}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Carboidratos</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {dailyCarbs}g / {carbsGoal}g
                  </span>
                </div>
              </Card>

              <Card className="bg-white border-blue-100 p-4 shadow-md">
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#E0E7FF" strokeWidth="6" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#2563EB"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${fatPercentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-700">{Math.round(fatPercentage)}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Gordura</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {dailyFat}g / {fatGoal}g
                  </span>
                </div>
              </Card>
            </div>

            {/* Recent Uploads */}
            {recentUploads.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Uploads Recentes</h3>
                <div className="space-y-3">
                  {recentUploads.map((upload, idx) => (
                    <Card key={idx} className="bg-white border-blue-100 p-4 shadow-md">
                      <div className="flex items-center gap-4">
                        <img
                          src={upload.image}
                          alt={upload.food}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{upload.food}</h4>
                            <span className="text-xs text-gray-500">{upload.time}</span>
                          </div>
                          <p className="text-sm text-blue-600 font-semibold mb-2">
                            {upload.calories} kcal
                          </p>
                          <div className="flex gap-3 text-xs">
                            <span className="text-blue-600">P: {upload.protein}g</span>
                            <span className="text-blue-500">C: {upload.carbs}g</span>
                            <span className="text-blue-700">G: {upload.fat}g</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Prompt */}
            {recentUploads.length === 0 && (
              <Card className="bg-white border-blue-100 p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Comece a Rastrear</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Tire uma foto da sua refeição para analisar calorias e macros
                </p>
              </Card>
            )}
          </div>
        )}

        {activeView === "recipes" && (
          <div className="space-y-4">
            {!selectedRecipe ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Receitas Low Carb</h2>
                    <p className="text-sm text-gray-600">20 refeições para ajudar no emagrecimento</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {lowCarbMeals.map((meal) => (
                    <Card 
                      key={meal.id} 
                      className="bg-white border-blue-100 p-4 hover:border-blue-300 transition-all shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => setSelectedRecipe(meal)}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-20 h-20 rounded-lg object-cover border-2 border-blue-100"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2 text-gray-900">{meal.name}</h4>
                          <div className="flex gap-3 mb-3 text-xs">
                            <span className="text-blue-600 flex items-center gap-1 font-medium">
                              <Flame className="w-3 h-3" />
                              {meal.calories} kcal
                            </span>
                            <span className="text-blue-500">C: {meal.carbs}g</span>
                            <span className="text-blue-600">P: {meal.protein}g</span>
                            <span className="text-blue-700">G: {meal.fat}g</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                              >
                                {ingredient}
                              </span>
                            ))}
                            {meal.ingredients.length > 3 && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                +{meal.ingredients.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {/* Header com botão voltar */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="w-10 h-10 bg-white border border-blue-200 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-600" />
                  </button>
                  <h2 className="text-xl font-bold text-gray-900">{selectedRecipe.name}</h2>
                </div>

                {/* Imagem da receita */}
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover rounded-xl border-2 border-blue-100"
                />

                {/* Informações nutricionais */}
                <Card className="bg-white border-blue-100 p-4 shadow-md">
                  <h3 className="font-semibold mb-3 text-gray-900">Informações Nutricionais</h3>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedRecipe.calories}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{selectedRecipe.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedRecipe.protein}g</div>
                      <div className="text-xs text-gray-600">Proteína</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700">{selectedRecipe.fat}g</div>
                      <div className="text-xs text-gray-600">Gordura</div>
                    </div>
                  </div>
                </Card>

                {/* Ingredientes */}
                <Card className="bg-white border-blue-100 p-4 shadow-md">
                  <h3 className="font-semibold mb-3 text-gray-900">Ingredientes</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Modo de Preparo */}
                <Card className="bg-white border-blue-100 p-4 shadow-md">
                  <h3 className="font-semibold mb-3 text-gray-900">Modo de Preparo</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.preparation.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeView === "analytics" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Análises</h2>
                <p className="text-sm text-gray-600">Acompanhe seu progresso semanal</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-white border-blue-100 p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Média Semanal</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{avgCalories}</p>
                <p className="text-xs text-gray-500">kcal/dia</p>
              </Card>

              <Card className="bg-white border-blue-100 p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Dias Ativos</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{activeDays}</p>
                <p className="text-xs text-gray-500">esta semana</p>
              </Card>
            </div>

            {/* Weekly Chart */}
            <Card className="bg-white border-blue-100 p-6 shadow-lg">
              <h3 className="font-semibold mb-4 text-gray-900">Calorias Semanais</h3>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyData.map((data, idx) => {
                  const height = (data.calories / maxCalories) * 100;
                  const isToday = idx === currentDayIndex;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex items-end justify-center" style={{ height: '160px' }}>
                        <div
                          className={`w-full rounded-t-lg transition-all ${
                            isToday 
                              ? 'bg-gradient-to-t from-blue-600 to-blue-500' 
                              : 'bg-gradient-to-t from-blue-300 to-blue-200'
                          }`}
                          style={{ height: `${height}%` }}
                        >
                          {data.calories > 0 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700">
                              {data.calories}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                        {data.day}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-blue-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Meta: {caloriesGoal} kcal</span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-blue-600"></div>
                    Hoje
                  </span>
                </div>
              </div>
            </Card>

            {/* Achievements - só aparece quando completar 7 dias */}
            {activeDays >= 7 && (
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 p-6 shadow-lg text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">Conquistas</h3>
                    <p className="text-sm text-blue-100">Continue assim!</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <span className="text-sm">🔥 Sequência de 7 dias</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <span className="text-sm">🎯 Meta semanal atingida</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Completo</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeView === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Ajustes</h2>
            
            {/* Calculadora de Nutrição */}
            <Card className="bg-white border-blue-100 p-6 shadow-lg">
              <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-blue-600" />
                Calculadora de Nutrição
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Insira seus dados para calcular suas necessidades diárias para emagrecimento
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 font-medium block mb-2">
                    Peso Atual (kg)
                  </label>
                  <input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="Ex: 80"
                    className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 font-medium block mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex: 175"
                    className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 font-medium block mb-2">
                    Peso Desejado (kg)
                  </label>
                  <input
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    placeholder="Ex: 70"
                    className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button
                  onClick={calculateNutrition}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all"
                >
                  Calcular Necessidades
                </Button>
              </div>
            </Card>

            {/* Resultados do Cálculo */}
            {calculatedNutrition && (
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 p-6 shadow-lg text-white">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Suas Metas Diárias
                </h3>
                
                <div className="space-y-4">
                  {/* Calorias */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Calorias</span>
                      <span className="text-2xl font-bold">{calculatedNutrition.calories}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">kcal por dia</p>
                  </div>

                  {/* Proteína */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Proteína</span>
                      <span className="text-2xl font-bold">{calculatedNutrition.protein}g</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-200 rounded-full h-2" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">
                      {Math.round((calculatedNutrition.protein * 4 / calculatedNutrition.calories) * 100)}% das calorias
                    </p>
                  </div>

                  {/* Carboidratos */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Carboidratos</span>
                      <span className="text-2xl font-bold">{calculatedNutrition.carbs}g</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-300 rounded-full h-2" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">
                      {Math.round((calculatedNutrition.carbs * 4 / calculatedNutrition.calories) * 100)}% das calorias
                    </p>
                  </div>

                  {/* Gordura */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Gordura</span>
                      <span className="text-2xl font-bold">{calculatedNutrition.fat}g</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 rounded-full h-2" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">
                      {Math.round((calculatedNutrition.fat * 9 / calculatedNutrition.calories) * 100)}% das calorias
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-blue-100">
                    💡 Estes valores são calculados para um déficit calórico saudável de 20%, 
                    ideal para perda de peso gradual e sustentável.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Relógio no canto inferior direito */}
      <div className="fixed bottom-2 right-2 text-[10px] text-gray-400 font-mono bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm z-40">
        {formattedTime}
      </div>

      {/* Camera FAB */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isAnalyzing}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed z-50"
      >
        {isAnalyzing ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => setActiveView("home")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeView === "home" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </button>
          
          <button
            onClick={() => setActiveView("recipes")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeView === "recipes" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <ChefHat className="w-6 h-6" />
            <span className="text-xs">Receitas</span>
          </button>
          
          <div className="w-12" /> {/* Spacer for FAB */}
          
          <button
            onClick={() => setActiveView("analytics")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeView === "analytics" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Análises</span>
          </button>
          
          <button
            onClick={() => setActiveView("settings")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeView === "settings" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Ajustes</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
