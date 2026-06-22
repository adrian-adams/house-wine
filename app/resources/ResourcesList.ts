import { ContentUI } from "@/types/ui"
import { Sprout, ChartNoAxesColumn, CircleGauge, Gift, ShoppingCart, Tag  } from 'lucide-react';

// Image path for Powerful Features card images
const imgPath = '/home/powerful-features/'

type ResListUI = Pick<ContentUI, 'src' | 'title' | 'desc' | 'icon' | 'href' | 'style'>

const resMain: ResListUI[] = [
    { 
        icon: Sprout, 
        title: 'Grape Encyclopedia', 
        desc: 'Every grape variety in one place. From Nebbiolo to Grüner Veltliner — explore origins, tasting profiles and food pairings for hundreds of varieties.',
        href: '',
        style: ''
     },
     { 
        icon: Sprout, 
        title: 'Burgundy: The Complete Map', 
        desc: 'Navigate every village, premier cru and grand cru vineyard across the Côte d\'Or, Chablis, Côte Chalonnaise and Mâconnais. The most comprehensive Burgundy reference online.',
        href: '',
        style: ''
     },
     { 
        icon: Sprout, 
        title: 'Wine Classifications', 
        desc: 'Every major classification system decoded. Bordeaux 1855, Burgundy Grand Cru, Italian DOCG, German Prädikat, Spanish Reserva — understand the hierarchy behind the label.',
        href: '',
        style: ''
     },
     { 
        icon: Sprout, 
        title: 'Food & Wine Pairing', 
        desc: 'The definitive pairing guide. From steak to sushi, cheese to chocolate — find the perfect wine for every dish with clear explanations of why each pairing works.',
        href: '',
        style: ''
     },
     { 
        icon: Sprout, 
        title: 'Wine Glossary A–Z', 
        desc: '80+ wine terms clearly explained. From assemblage to véraison — search, browse, and finally understand what\'s on the back of the label.',
        href: '',
        style: ''
     },
]

const vintageCards: ResListUI[] = [
    { 
        icon: ChartNoAxesColumn, 
        title: 'Vintage Chart Bordeaux', 
        desc: 'Scores for every major Bordeaux vintage from 1945 to today. See which years produced legends, which to drink now, and how many bottles are available on our marketplace.',
        href: '' 
    },
    { 
        icon: ChartNoAxesColumn, 
        title: 'Vintage Chart Barolo', 
        desc: 'Piedmont\'s noblest wine, rated year by year. From the monumental 2010 to the mythical 1947 — know exactly what you\'re buying.',
        href: '' 
    },
    { 
        icon: ChartNoAxesColumn, 
        title: 'Vintage Chart Burgundy', 
        desc: 'Separate charts for red and white. Track the evolution of Pinot Noir and Chardonnay across decades, with quality scores and available bottles.',
        href: ''
    },
    { 
        icon: ChartNoAxesColumn, 
        title: 'Vintage Chart Sauternes', 
        desc: 'The world\'s greatest dessert wine, rated from 1921 to today. Sauternes can age for a century — know which vintages are legendary.',
        href: '' 
    }
]

const guides: ResListUI[] = [
    {
        icon: CircleGauge,
        title: "Wine Storage Guide",
        desc: "Know when to uncork. Drinking windows for every major wine type, from Bordeaux Grand Cru to Non-vintage Champagne.",
        href: ""
    },
    {
        icon: Gift,
        title: "Birthday Wines",
        desc: "Find a wine from a special year — birth year, wedding year or other milestone.",
        href: ""
    },
    {
        icon: ShoppingCart,
        title: "Buy Vintage Wine",
        desc: "Tips for buying older vintages from collectors and small dealers.",
        href: ""
    },
    {
        icon: Tag,
        title: "Sell Vintage Wine",
        desc: "How to catalogue and sell your older vintages through your own shop.",
        href: ""
    },
]

const wineRegions: ResListUI[] = [
    { title: "Meursault", desc: "France", href: "" },
    { title: "Montrachet", desc: "France", href: "" },
    { title: "Barolo", desc: "", href: "Italy" },
    { title: "Barbaresco", desc: "Italy", href: "" },
    { title: "Pomerol", desc: "France", href: "" },
    { title: "Pauillac", desc: "France", href: "" },
    { title: "Barossa Valley", desc: "Australia", href: "" },
    { title: "Le Mesnil-sur-Oger", desc: "France", href: "" },
    { title: "Châteauneuf-du-Pape", desc: "France", href: "" },
    { title: "Bandol", desc: "France", href: "" },
    { title: "Chablis", desc: "France", href: "" },
    { title: "Côte d'Or", desc: "France", href: "" },
    { title: "Hermitage", desc: "France", href: "" },
    { title: "Cornas", desc: "France", href: "" },
    { title: "Gigondas", desc: "France", href: "" },
    { title: "Margaret River", desc: "Australia", href: "" },
    { title: "Rioja", desc: "Spain", href: "" },
    { title: "Stellenbosch", desc: "South Africa", href: "" }
]

const moreAboutWine: ResListUI[] = [
    { title: "", desc: "", href: ""  }
]