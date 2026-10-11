/* ==========================================================================
   TravelGo - Fictional Demonstration Data Objects
   ========================================================================== */

const TG_DATA = {
  destinations: [
    {
      id: "santorini",
      name: "Santorini",
      country: "Greece",
      rating: 4.9,
      staysCount: 128,
      image: "assets/images/santorini_dest.jpg",
      popular: true,
      priceFrom: 290
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      rating: 4.8,
      staysCount: 245,
      image: "assets/images/bali_dest.jpg",
      popular: true,
      priceFrom: 180
    },
    {
      id: "amalfi",
      name: "Amalfi Coast",
      country: "Italy",
      rating: 4.9,
      staysCount: 94,
      image: "assets/images/amalfi_dest.jpg",
      popular: true,
      priceFrom: 340
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      rating: 4.9,
      staysCount: 152,
      image: "assets/images/kyoto_dest.jpg",
      popular: true,
      priceFrom: 210
    },
    {
      id: "maldives",
      name: "Maldives",
      country: "Indian Ocean",
      rating: 5.0,
      staysCount: 86,
      image: "assets/images/maldives_dest.jpg",
      popular: true,
      priceFrom: 650
    },
    {
      id: "swiss",
      name: "Zermatt",
      country: "Switzerland",
      rating: 4.8,
      staysCount: 110,
      image: "assets/images/swiss_dest.jpg",
      popular: false,
      priceFrom: 390
    }
  ],

  hotels: [
    {
      id: "hotel-astra",
      name: "Astra Suites Santorini",
      category: "hotels",
      categoryLabel: "Boutique Hotel",
      destination: "Santorini, Greece",
      locationDetail: "Imerovigli • 0.3 km from Caldera cliff path",
      rating: 4.9,
      reviewsCount: 428,
      badge: "Featured",
      pricePerNight: 380,
      images: [
        "assets/images/hotel_astra.jpg",
        "assets/images/hotel_astra_2.jpg",
        "assets/images/hotel_astra_3.jpg"
      ],
      description: "Perched atop the tranquil volcanic cliffs of Imerovigli, Astra Suites offers breathtaking panoramic views of the Aegean caldera, Aegean sunset, and the historic Skaros Rock. Enjoy world-class Greek hospitality, bespoke cliffside dining, and intimate infinity pools.",
      amenities: [
        { name: "Free Wi-Fi", icon: "wifi" },
        { name: "Infinity Pool", icon: "waves" },
        { name: "Sea View", icon: "eye" },
        { name: "Spa & Wellness", icon: "sparkles" },
        { name: "Airport Shuttle", icon: "car" },
        { name: "Free Breakfast", icon: "coffee" },
        { name: "Air Conditioning", icon: "wind" },
        { name: "Cocktail Bar", icon: "glass-water" }
      ],
      rooms: [
        {
          id: "room-deluxe",
          name: "Deluxe Caldera View Suite",
          size: "45 m²",
          capacity: "2 Guests (1 King Bed)",
          price: 380,
          image: "assets/images/room_deluxe.jpg",
          perks: [
            "Panoramic caldera and sunset balcony",
            "Private outdoor hot tub",
            "Gourmet complimentary Greek breakfast",
            "Free cancellation up to 48 hrs before arrival"
          ]
        },
        {
          id: "room-honeymoon",
          name: "Honeymoon Cave Suite with Plunge Pool",
          size: "62 m²",
          capacity: "2 Guests (1 King Bed)",
          price: 520,
          image: "assets/images/room_honeymoon.jpg",
          perks: [
            "Private heated volcanic plunge pool",
            "Welcome champagne & fresh fruit basket",
            "Signature cliffside breakfast served on terrace",
            "Complimentary airport limousine transfer"
          ]
        },
        {
          id: "room-presidential",
          name: "Presidential Villa with Private Pool",
          size: "110 m²",
          capacity: "4 Guests (2 Bedrooms)",
          price: 890,
          image: "assets/images/room_presidential.jpg",
          perks: [
            "Full private infinity swimming pool",
            "Dedicated private butler service 24/7",
            "Private sunset terrace with chef dining setup",
            "Includes catamaran sunset cruise pass"
          ]
        }
      ]
    },
    {
      id: "hotel-canaves",
      name: "Canaves Oia Epitome",
      category: "villas",
      categoryLabel: "Luxury Villa",
      destination: "Santorini, Greece",
      locationDetail: "Oia • 0.5 km from Ammoudi Bay",
      rating: 5.0,
      reviewsCount: 312,
      badge: "Superhost Villa",
      pricePerNight: 540,
      images: [
        "assets/images/hotel_canaves.jpg",
        "assets/images/hotel_astra_2.jpg"
      ],
      description: "Set above the picturesque fishing village of Ammoudi, Canaves Oia Epitome blends barefoot luxury with authentic cycladic design. Each villa offers sea views and private plunge pools.",
      amenities: [
        { name: "Private Pool", icon: "waves" },
        { name: "Sunset View", icon: "sun" },
        { name: "Fine Dining", icon: "utensils" },
        { name: "Luxury Spa", icon: "sparkles" },
        { name: "Butler Service", icon: "user-check" }
      ],
      rooms: [
        {
          id: "canaves-villa",
          name: "Epitome Pool Villa",
          size: "70 m²",
          capacity: "2 Guests",
          price: 540,
          image: "assets/images/room_honeymoon.jpg",
          perks: ["Private pool", "Sunset veranda", "Free breakfast", "Free cancellation"]
        }
      ]
    },
    {
      id: "hotel-grace",
      name: "Grace Hotel Santorini",
      category: "resorts",
      categoryLabel: "Cliffside Resort",
      destination: "Santorini, Greece",
      locationDetail: "Imerovigli • Center of Caldera",
      rating: 4.9,
      reviewsCount: 280,
      badge: "Best Seller",
      pricePerNight: 490,
      images: [
        "assets/images/hotel_grace.jpg",
        "assets/images/hotel_astra_3.jpg"
      ],
      description: "An exclusive boutique cliffside sanctuary perched above the Aegean Sea, offering an iconic infinity pool and award-winning Mediterranean gastronomy.",
      amenities: [
        { name: "Infinity Pool", icon: "waves" },
        { name: "Champagne Lounge", icon: "wine" },
        { name: "Fitness Center", icon: "dumbbell" },
        { name: "Sea View", icon: "eye" }
      ],
      rooms: [
        {
          id: "grace-suite",
          name: "Grace Caldera Suite",
          size: "50 m²",
          capacity: "2 Guests",
          price: 490,
          image: "assets/images/room_deluxe.jpg",
          perks: ["Plunge pool", "Champagne breakfast", "Daily treats", "Free cancellation"]
        }
      ]
    },
    {
      id: "hotel-bali",
      name: "The Kayon Jungle Resort",
      category: "resorts",
      categoryLabel: "Jungle Resort",
      destination: "Ubud, Bali",
      locationDetail: "Ubud • Valleys & Rainforest",
      rating: 4.9,
      reviewsCount: 512,
      badge: "Top Resort",
      pricePerNight: 360,
      images: [
        "assets/images/hotel_bali.jpg",
        "assets/images/bali_dest.jpg"
      ],
      description: "Immersed in the lush jungle valleys of Ubud, Kayon Jungle Resort offers iconic tiered infinity pools, holistic Serenity Spa treatments, and elevated Indonesian fine dining.",
      amenities: [
        { name: "3-Tier Pool", icon: "waves" },
        { name: "Jungle Spa", icon: "sparkles" },
        { name: "Free Breakfast", icon: "coffee" },
        { name: "Yoga Pavilion", icon: "heart" }
      ],
      rooms: [
        {
          id: "kayon-pool-villa",
          name: "Kayon Royal Pool Villa",
          size: "95 m²",
          capacity: "2 Guests",
          price: 360,
          image: "assets/images/room_deluxe.jpg",
          perks: ["Private infinity pool", "Rainforest valley view", "Floating breakfast", "Free cancellation"]
        }
      ]
    },
    {
      id: "hotel-amalfi",
      name: "Amalfi Cliffside Grand Hotel",
      category: "hotels",
      categoryLabel: "Coastal Hotel",
      destination: "Amalfi Coast, Italy",
      locationDetail: "Positano • 0.2 km from Marina Grande",
      rating: 4.9,
      reviewsCount: 384,
      badge: "Heritage",
      pricePerNight: 440,
      images: [
        "assets/images/hotel_amalfi.jpg",
        "assets/images/amalfi_dest.jpg"
      ],
      description: "Carved into the dramatic Amalfi coastal cliffs, featuring private lemon groves, saltwater panoramic pools, and Michelin-star Mediterranean dining.",
      amenities: [
        { name: "Saltwater Pool", icon: "waves" },
        { name: "Sea View", icon: "eye" },
        { name: "Fine Dining", icon: "utensils" },
        { name: "Private Beach", icon: "sun" }
      ],
      rooms: [
        {
          id: "amalfi-suite",
          name: "Panoramic Ocean Suite",
          size: "60 m²",
          capacity: "2 Guests",
          price: 440,
          image: "assets/images/room_honeymoon.jpg",
          perks: ["Private terrace over sea", "Free champagne breakfast", "Beach club access"]
        }
      ]
    },
    {
      id: "hotel-mystique",
      name: "Mystique Luxury Collection",
      category: "resorts",
      categoryLabel: "Cave Resort",
      destination: "Santorini, Greece",
      locationDetail: "Oia • Caldera Cliffs",
      rating: 4.9,
      reviewsCount: 245,
      badge: "Luxury",
      pricePerNight: 420,
      images: ["assets/images/hotel_mystique.jpg"],
      description: "Carved into the rugged caldera cliffs of Oia, Mystique features cave suites, secluded infinity pools, and organic regional wine tastings.",
      amenities: [
        { name: "Infinity Pool", icon: "waves" },
        { name: "Wine Cellar", icon: "wine" },
        { name: "Spa", icon: "sparkles" }
      ],
      rooms: [
        {
          id: "mystique-cave",
          name: "Allure Cave Suite",
          size: "48 m²",
          capacity: "2 Guests",
          price: 420,
          image: "assets/images/room_deluxe.jpg",
          perks: ["Cave architecture", "Caldera terrace", "Free cancellation"]
        }
      ]
    },
    {
      id: "hotel-katikies",
      name: "Katikies Santorini",
      category: "hotels",
      categoryLabel: "Luxury Hotel",
      destination: "Santorini, Greece",
      locationDetail: "Oia • Caldera Rim",
      rating: 4.8,
      reviewsCount: 360,
      badge: "Iconic",
      pricePerNight: 460,
      images: ["assets/images/hotel_katikies.jpg"],
      description: "Renowned for whitewashed bridges, hidden cubist suites, and infinity pools blending seamlessly with the deep blue horizon.",
      amenities: [
        { name: "Cave Pools", icon: "waves" },
        { name: "Rooftop Lounge", icon: "glass-water" },
        { name: "Free Breakfast", icon: "coffee" }
      ],
      rooms: [
        {
          id: "katikies-suite",
          name: "Senior Suite",
          size: "40 m²",
          capacity: "2 Guests",
          price: 460,
          image: "assets/images/room_deluxe.jpg",
          perks: ["Private hot tub", "Sea view"]
        }
      ]
    },
    {
      id: "hotel-andronis",
      name: "Andronis Luxury Suites",
      category: "villas",
      categoryLabel: "Private Villa",
      destination: "Santorini, Greece",
      locationDetail: "Oia • Cliffside Center",
      rating: 4.9,
      reviewsCount: 195,
      badge: "Romantic",
      pricePerNight: 510,
      images: ["assets/images/hotel_andronis.jpg"],
      description: "Exclusive multi-level cliffside retreat with dramatic vistas of the volcanic caldera and luxury multi-course degustation dining.",
      amenities: [
        { name: "Private Hot Tub", icon: "bath" },
        { name: "Gourmet Dining", icon: "utensils" }
      ],
      rooms: [
        {
          id: "andronis-premier",
          name: "Premier Suite",
          size: "55 m²",
          capacity: "2 Guests",
          price: 510,
          image: "assets/images/room_honeymoon.jpg",
          perks: ["Hot tub on caldera edge", "Free breakfast", "Free cancellation"]
        }
      ]
    }
  ],

  itineraryTemplate: [
    {
      day: 1,
      title: "Arrival & Caldera Sunset Welcome",
      time: "15:00 - 21:00",
      description: "Private VIP airport transfer to Astra Suites. Champagne check-in followed by a relaxing dip in the heated plunge pool. 19:30 table reserved for sunset dinner at 360 Caldera Terrace."
    },
    {
      day: 2,
      title: "Catamaran Sailing & Volcanic Hot Springs",
      time: "10:30 - 16:30",
      description: "Private 5-hour catamaran cruise across the Santorini Caldera, swimming at the Red Beach, soaking in thermal hot springs, and Greek barbecue lunch prepared onboard."
    },
    {
      day: 3,
      title: "Megalochori Wine Tasting & Oia Exploration",
      time: "11:00 - 18:00",
      description: "Sommelier-guided tour of two historic volcanic vineyards featuring Assyrtiko wines. Afternoon stroll through the winding marble pathways of Oia with photo stops at blue domes."
    },
    {
      day: 4,
      title: "Perissa Black Sand Beach & Sunset Spa",
      time: "10:00 - 19:00",
      description: "Reserved luxury cabana at Perissa Black Sand Beach Club. 17:00 couples volcanic stone massage at Astra Holistic Spa."
    },
    {
      day: 5,
      title: "Fira Hiking & Farewell Rooftop Cocktails",
      time: "09:30 - 22:00",
      description: "Morning cliffside trail hike from Imerovigli to Fira town. Artisan shopping and evening farewell signature cocktails overlooking the illuminated caldera."
    },
    {
      day: 6,
      title: "Gourmet Breakfast & Departure",
      time: "09:00 - 11:30",
      description: "Champagne breakfast delivered to your private terrace. Hotel checkout and private executive transfer to Santorini Thira Airport (JTR)."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Elena Rostova",
      avatar: "assets/images/avatar_rev1.jpg",
      rating: 5,
      date: "October 2026",
      title: "A dream honeymoon stay in Santorini!",
      comment: "Astra Suites completely exceeded our wildest expectations! Watching the sun dip into the Aegean from our private hot tub was magical. The staff catered to every wish with unmatched grace."
    },
    {
      id: "rev-2",
      author: "Marcus Chen",
      avatar: "assets/images/avatar_rev2.jpg",
      rating: 5,
      date: "September 2026",
      title: "Best caldera views on the island",
      comment: "The location in Imerovigli is much quieter and more refined than crowded Oia. The breakfast was exquisite, freshly baked pastries and Greek yogurts every morning."
    },
    {
      id: "rev-3",
      author: "Sophia Laurent",
      avatar: "assets/images/avatar_rev3.jpg",
      rating: 4.8,
      date: "August 2026",
      title: "Pure paradise and sublime tranquility",
      comment: "Everything from the infinity pool to the evening concierge recommendations was 5-star perfection. We are already planning our return next summer."
    }
  ]
};
