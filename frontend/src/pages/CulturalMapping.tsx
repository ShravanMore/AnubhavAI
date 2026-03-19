import React, { useState, useRef, useEffect } from 'react';
import { Map, Globe, Clock, Book, MapPin } from 'lucide-react';

interface TimelineEvent {
  year: string;
  artifact: string;
  image: string;
  description: string;
  location: string;
  significance: string;
}

interface ContinentData {
  name: string;
  image: string;
  description: string;
  timeline: TimelineEvent[];
}

const CulturalMapping: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  const continentsData: Record<string, ContinentData> = {
    asia: {
      name: "Asia",
      image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3",
      description: "From ancient pottery to intricate jade carvings, Asian artifacts showcase technological sophistication and artistic mastery.",
      timeline: [
        {
          year: "7000 BCE",
          artifact: "Chinese Neolithic Pottery",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7re8Rkz047FTapA8noHXq35DnS8Aoi6DH8g&s",
          description: "Early painted pottery from the Yangshao culture, featuring geometric and animal designs.",
          location: "China",
          significance: "One of the earliest examples of sophisticated ceramic art in East Asia"
        },
        {
          year: "5000 BCE",
          artifact: "Jomon Pottery",
          image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3",
          description: "Distinctive cord-marked pottery with elaborate flame-like ornamentation.",
          location: "Japan",
          significance: "World's earliest known pottery tradition"
        },
        {
          year: "2500 BCE",
          artifact: "Indus Valley Seals",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFN8b9t1pfD8Al6nTD1RTRpJ6th1dzxOvvjQ&s",
          description: "Intricately carved steatite seals with animal motifs and early writing.",
          location: "Pakistan/India",
          significance: "Early evidence of writing and administrative systems"
        },
        {
          year: "1600 BCE",
          artifact: "Shang Dynasty Bronzes",
          image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/76974/170596/main-image",
          description: "Sophisticated ritual vessels with taotie masks and intricate patterns.",
          location: "China",
          significance: "Peak of early Chinese bronze casting technology"
        },
        {
          year: "500 BCE",
          artifact: "Persian Gold Work",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4j-gqS5fLCHRdy19XcwNxInlEbdTZjXuqlA&s",
          description: "Achaemenid gold jewelry and ceremonial vessels.",
          location: "Iran",
          significance: "Exemplifies advanced metalworking techniques"
        },
        {
          year: "200 CE",
          artifact: "Gandhara Buddha Sculptures",
          image: "https://cdn.britannica.com/50/136650-050-4F7FF9C2/statue-Buddha-style-Gandhara-Delhi-Museum-India.jpg",
          description: "Stone sculptures showing Greek influence on Buddhist art.",
          location: "Pakistan/Afghanistan",
          significance: "Fusion of Eastern and Western artistic traditions"
        },
        {
          year: "800 CE",
          artifact: "Angkor Stone Carvings",
          image: "https://images.saymedia-content.com/.image/t_share/MTc0NjQxMjY1NDc5MTMzMTc0/khmer-stone-carvings.jpg",
          description: "Intricate bas-reliefs depicting mythology and daily life.",
          location: "Cambodia",
          significance: "Masterpiece of Southeast Asian stone carving"
        },
        {
          year: "1200 CE",
          artifact: "Song Dynasty Porcelain",
          image: "https://cdn.britannica.com/57/7957-050-3C369DF4/jar-Longquan-glaze-province-Song-dynasty-Zhejiang.jpg",
          description: "Celadon and qingbai wares with subtle glazes.",
          location: "China",
          significance: "Technical perfection in ceramic production"
        },
        {
          year: "1600 CE",
          artifact: "Mughal Miniatures",
          image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3",
          description: "Detailed paintings with Persian and Indian influences.",
          location: "India",
          significance: "Height of South Asian painting tradition"
        },
        {
          year: "1800 CE",
          artifact: "Japanese Ukiyo-e Prints",
          image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3",
          description: "Woodblock prints depicting urban life and landscapes.",
          location: "Japan",
          significance: "Innovation in printmaking techniques"
        }
      ]
    },
    europe: {
      name: "Europe",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3",
      description: "European artifacts reflect technological advancement and changing artistic styles across centuries.",
      timeline: [
        {
          year: "30000 BCE",
          artifact: "Cave Paintings",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/220px-Lascaux_painting.jpg",
          description: "Prehistoric paintings depicting animals and hunting scenes.",
          location: "France/Spain",
          significance: "Earliest known European artistic expression"
        },
        {
          year: "3000 BCE",
          artifact: "Cycladic Figurines",
          image: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixlib=rb-4.0.3",
          description: "Marble sculptures with minimalist human forms.",
          location: "Greece",
          significance: "Early abstract representation in sculpture"
        },
        {
          year: "1600 BCE",
          artifact: "Minoan Frescoes",
          image: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?ixlib=rb-4.0.3",
          description: "Vibrant wall paintings showing palace life and nature.",
          location: "Crete",
          significance: "Advanced painting techniques in Bronze Age"
        },
        {
          year: "500 BCE",
          artifact: "Greek Black-Figure Pottery",
          image: "https://cdn.britannica.com/32/30432-004-B5FD66EB/satyrs-Dionysus-amphora-style-Amasis-Painter-Antikenmuseum.jpg",
          description: "Ceramic vessels with mythological scenes.",
          location: "Greece",
          significance: "Innovation in ceramic decoration"
        },
        {
          year: "100 CE",
          artifact: "Roman Mosaics",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk6c4l7om5c4OA82KWRG1Bn0He9_nTjErEw&s",
          description: "Detailed floor and wall mosaics depicting daily life.",
          location: "Roman Empire",
          significance: "Advancement in decorative arts"
        },
        {
          year: "800 CE",
          artifact: "Celtic Illuminated Manuscripts",
          image: "https://cdn.britannica.com/75/136775-050-5286A3E7/depiction-letters-chi-name-rho-Greek-Christ-c-800-AD.jpg?w=400&h=300&c=crop",
          description: "Intricately decorated religious texts.",
          location: "Ireland/Britain",
          significance: "Peak of medieval manuscript illumination"
        },
        {
          year: "1200 CE",
          artifact: "Gothic Stained Glass",
          image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3",
          description: "Colored glass windows with biblical narratives.",
          location: "France",
          significance: "Technical innovation in glasswork"
        },
        {
          year: "1400 CE",
          artifact: "Flemish Oil Paintings",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqOp-MGjP8QLyc-7BaRJ9U2H-Wh-aVjIPxQ&s",
          description: "Detailed paintings using new oil techniques.",
          location: "Netherlands",
          significance: "Revolution in painting technology"
        },
        {
          year: "1500 CE",
          artifact: "Renaissance Sculptures",
          image: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixlib=rb-4.0.3",
          description: "Marble sculptures showing anatomical accuracy.",
          location: "Italy",
          significance: "Peak of Renaissance sculptural achievement"
        },
        {
          year: "1700 CE",
          artifact: "Baroque Decorative Arts",
          image: "https://assets-cdn.vam.ac.uk/2018/08/08/15/53/26/bbbf83cc-654a-4ef1-b11f-a80590c844f1/640.jpg",
          description: "Elaborate furniture and interior decorations.",
          location: "France",
          significance: "Height of decorative craftsmanship"
        }
      ]
    },
    africa: {
      name: "Africa",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3",
      description: "African artifacts showcase diverse materials and techniques in creating both ceremonial and practical items.",
      timeline: [
        {
          year: "70000 BCE",
          artifact: "Blombos Cave Artifacts",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzk7BZeYwzWyuyUnXDsyUC95LeyoNQr6AVog&s",
          description: "Ochre pieces with geometric engravings.",
          location: "South Africa",
          significance: "Earliest known human artistic expression"
        },
        {
          year: "3000 BCE",
          artifact: "Egyptian Hieroglyphs",
          image: "https://cdn.britannica.com/88/124388-050-EFAFCE59/Hieroglyphs-temple-Ombos-Egypt.jpg",
          description: "Early pictographic writing on temple walls.",
          location: "Egypt",
          significance: "Development of written communication"
        },
        {
          year: "2500 BCE",
          artifact: "Nubian Gold Work",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQGKOvahYG6Iav-c_6SY2UcXCk3xEtH9FTw&s",
          description: "Intricate gold jewelry and royal artifacts.",
          location: "Sudan",
          significance: "Advanced metalworking techniques"
        },
        {
          year: "500 BCE",
          artifact: "Nok Terracotta",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3nYjutFzFFjSZr_cgzdEQGdtVrl-7n-oxDg&s",
          description: "Sophisticated clay sculptures of human figures.",
          location: "Nigeria",
          significance: "Early West African sculptural tradition"
        },
        {
          year: "300 CE",
          artifact: "Aksum Stelae",
          image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?ixlib=rb-4.0.3",
          description: "Carved stone monuments marking royal tombs.",
          location: "Ethiopia",
          significance: "Monumental stone carving achievement"
        },
        {
          year: "800 CE",
          artifact: "Igbo-Ukwu Bronzes",
          image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3",
          description: "Complex cast bronze ceremonial vessels.",
          location: "Nigeria",
          significance: "Sophisticated lost-wax casting technique"
        },
        {
          year: "1200 CE",
          artifact: "Great Zimbabwe Stone Work",
          image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?ixlib=rb-4.0.3",
          description: "Massive stone architecture without mortar.",
          location: "Zimbabwe",
          significance: "Achievement in architectural engineering"
        },
        {
          year: "1500 CE",
          artifact: "Benin Bronze Heads",
          image: "https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/barakatgallery/images/view/5d0f61008c5d9e8f98f9fd5dffa8f07bj/barakatgallery-benin-bronze-head-1800-ce-1900-ce.jpg",
          description: "Naturalistic royal portrait heads in bronze.",
          location: "Nigeria",
          significance: "Masterpiece of metal portraiture"
        },
        {
          year: "1700 CE",
          artifact: "Ethiopian Illuminated Manuscripts",
          image: "https://cdn.kastatic.org/ka-perseus-images/a43e7b5d631e16c1354f21fcaf6b7588a7d18940.jpg",
          description: "Colorful religious texts with unique style.",
          location: "Ethiopia",
          significance: "Distinct African manuscript tradition"
        },
        {
          year: "1800 CE",
          artifact: "Asante Gold Weights",
          image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Ashanti_goldweights.JPG",
          description: "Brass weights for measuring gold dust.",
          location: "Ghana",
          significance: "Precision metalwork for commerce"
        }
      ]
    },
    americas: {
      name: "The Americas",
      image: "https://images.unsplash.com/photo-1531176175280-33e81422832a?ixlib=rb-4.0.3",
      description: "Artifacts from the Americas reveal sophisticated civilizations and unique artistic traditions.",
      timeline: [
        {
          year: "3000 BCE",
          artifact: "Norte Chico Textiles",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gH_H879PsUdkmSNZZW4RhCYFGq3TeFpoKQ&s",
          description: "Early cotton textiles with complex weaving.",
          location: "Peru",
          significance: "Earliest known American textile tradition"
        },
        {
          year: "1500 BCE",
          artifact: "Olmec Colossal Heads",
          image: "https://upload.wikimedia.org/wikipedia/commons/3/31/San_Lorenzo_Monument_4_crop.jpg",
          description: "Massive basalt portrait heads of rulers.",
          location: "Mexico",
          significance: "First monumental sculpture in Americas"
        },
        {
          year: "800 BCE",
          artifact: "Chavin Stone Carvings",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkICcTtpFUPs2RodbD5vtzaBFyDWo8JGXMIg&s",
          description: "Complex relief carvings of deity figures.",
          location: "Peru",
          significance: "Early Andean sculptural tradition"
        },
        {
          year: "200 BCE",
          artifact: "Mayan Jade Masks",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI4idljFWlSvgq8uTGpWrqZpWHAuxUcCUs-w&s",
          description: "Intricate funeral masks made of jade mosaic.",
          location: "Guatemala",
          significance: "Masterpiece of lapidary art"
        },
        {
          year: "500 CE",
          artifact: "Moche Portrait Vessels",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6joEAqcIJW84wJ5SANGqbhvegVk9xFsoRg&s",
          description: "Realistic ceramic portraits of individuals.",
          location: "Peru",
          significance: "Height of ceramic portraiture"
        },
        {
          year: "800 CE",
          artifact: "Toltec Stone Warriors",
          image: "https://thumbs.dreamstime.com/b/tula-iv-22837766.jpg",
          description: "Columnar basalt warrior figures.",
          location: "Mexico",
          significance: "Influence on later Mesoamerican art"
        },
        {
          year: "1200 CE",
          artifact: "Inca Metalwork",
          image: "https://mavcor.yale.edu/sites/default/files/styles/wide_600/public/p_images/fig_9_met_image_4_small.jpg?itok=0Spqd5Vm",
          description: "Gold and silver ceremonial objects.",
          location: "Peru",
          significance: "Technical mastery of precious metals"
        },
        {
          year: "1400 CE",
          artifact: "Aztec Stone Calendar",
          image: "data:image/jpeg;base64,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",
          description: "Massive carved stone disk with cosmic symbols.",
          location: "Mexico",
          significance: "Complex astronomical knowledge in art"
        },
        {
          year: "1600 CE",
          artifact: "Northwest Coast Masks",
          image: "data:image/jpeg;base64,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",
          description: "Transformation masks with moving parts.",
          location: "Canada",
          significance: "Innovation in ceremonial art"
        },
        {
          year: "1800 CE",
          artifact: "Navajo Textiles",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWw-dL75R0NBt3CNS39cx0WAOO4aWyUmRajg&s",
          description: "Complex geometric pattern blankets.",
          location: "United States",
          significance: "Evolution of Native American weaving"
        }
      ]
    },
    oceania: {
      name: "Oceania",
      image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?ixlib=rb-4.0.3",
      description: "Oceanic artifacts reflect deep connections to the sea and natural environment.",
      timeline: [
        {
          year: "40000 BCE",
          artifact: "Aboriginal Rock Paintings",
          image: "https://cdn.odysseytraveller.com/app/uploads/2020/04/GettyImages-824773634.jpg",
          description: "Ochre paintings of Dreamtime stories.",
          location: "Australia",
          significance: "Oldest continuous art tradition"
        },
        {
          year: "1500 BCE",
          artifact: "Lapita Pottery",
          image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3",
          description: "Distinctive dentate-stamped pottery.",
          location: "Pacific Islands",
          significance: "Marker of Austronesian expansion"
        },
        {
          year: "800 CE",
          artifact: "Easter Island Moai",
          image: "https://media.cnn.com/api/v1/images/stellar/prod/190111092720-easter-island-moais-file-restricted.jpg?q=w_3000,h_2000,x_0,y_0,c_fill",
          description: "Massive stone ancestor figures.",
          location: "Rapa Nui",
          significance: "Achievement in megalithic sculpture"
        },
        {
          year: "1200 CE",
          artifact: "Maori Pounamu Carvings",
          image: "https://aneye4artgallery.com/cdn/shop/articles/pounamu_jewellery_greenstone_jewellery_jade_jewellery_nz_greenstone_jewellery_pounamu_nz_jewellery.jpg?v=1693446581&width=1920",
          description: "Jade pendants with spiritual significance.",
          location: "New Zealand",
          significance: "Masterpiece of jade working"
        },
        {
          year: "1400 CE",
          artifact: "Hawaiian Featherwork",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5nkTbdktHDkMy9DtuoMZvHABWlMZJJAfOw&s",
          description: "Royal cloaks made of rare bird feathers.",
          location: "Hawaii",
          significance: "Supreme achievement in feather art"
        },
        {
          year: "1600 CE",
          artifact: "Trobriand Islands Canoes",
          image: "https://www.art-pacific.com/images/trobcand.jpg",
          description: "Decorated ceremonial sea vessels.",
          location: "Papua New Guinea",
          significance: "Maritime technological achievement"
        },
        {
          year: "1700 CE",
          artifact: "Samoan Tapa Cloth",
          image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Wedding_Tapa_%28Gatu_Vakaviti%29_LACMA_M.2010.160.jpg",
          description: "Bark cloth with geometric patterns.",
          location: "Samoa",
          significance: "Innovation in textile arts"
        },
        {
          year: "1800 CE",
          artifact: "Melanesian Masks",
          image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFRUXGBcXFxYYFxgVFxcXFxgYFhYYFxYYHSggGBolHRYWITEhJSktLi4uGB8zODMtNygtLisBCgoKDg0OFxAQFy0dHR0tLS0rLS0tLS0tKy0tLS0tLS0tLS0tLS0rLSstKy0tLS0tLS0tLS0tLS0tLS0tLS0rLv/AABEIAKcBLQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADwQAAEDAgQDBgQEBQQCAwAAAAEAAhEDIQQSMUEFUWETInGBkaEGMrHwQsHR8SNSYnLhFDOCkgeiFjST/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EAB8RAQEBAQEBAAIDAQAAAAAAAAABEQIxIVFhQZGhEv/aAAwDAQACEQMRAD8A4QBEE+VEAqByp4RJKgSEwCMhMolMkEiE4CIcBa2HJa0WgGYk2vvG6yoWjUqS0GbNvfQaD9IUqxYo1i55fUdcA5W2jkDHO33ZLiWLNNrCC2M2k2MxzOgkHl4wq2LxwPdYGgWg2PS4+vnqlxMB5NPLpAAPgGm/QSb3t65xrV6rVOSPl5G5i1jzJExHU30KjrPysABgOMzvEkR4ffVUqgLonMD3iTAIBIgAX0jpzUeLfmYIMuaQInQDr5e6QtQ8VxOWk4BtzsYkSS7UXnfzN1zPDqha11rSCQdJExP/AGK3sc7uEtiREG5BjaOVrBZ9RgJ79OHAc9iCAcptOt5TUWXEPOdsyNP5rjWefXWeSjqvtr3ruAE5pN/IQ6f3UeHkAxlJEG8C2m9yd/qrfDKclz3AmBm5mP1m1/zWkXKGE7RsZALSd4ExAEwBb6qGjw2S/vX3JjXQR4zK3ME7tabarLNLAQDAOpsRvog4YzM1zqjHNcCWNEtbMgtDhJmMxBv15KDkalJwObc2Agi5GkCL3AhWMM4FgO8Dbu3nW9zHJXBh2kOGWIJIgkXm2m9j6BQ06Ra6CJFyNuf7IpqbJtPLW99h99VSOHkucw2brJAkAEGJvtZb2Dw5cYI6k6DkfNSV+H5ScrbOBBIiNNfX7us6uObxNYtyiJzCNdBIJBO7vPdaNAtytaI9LzAudyLKtj8PkbFhlFp2AnQRJdJjWLDkpKFTN3uYNuUjK3ykCVUZ3ExlqZpluaDveLdJj9VrYYd2ZF5G20E/ULK41XaHho01jlrYne8rV4U49mJMxB00JibeAFlRA8QUJCnxA7yiIRERCEhSEIUEaYqQhC4II5TwmISlAzgghGhIVHQQlCIhIKqBKFJCUIAhNCMpggEhIIymhEJX24EZJJsRPmLjx8FQVh1E1mZM0G4Hnf6qUiuzCMptOZ2a+aRrqQed46eVrdBTwmSmapvlLpqOeCHN7uVzSALd8CLnu7TbncBhHfI9jS6o8U2F3ym8Ez+a674hwzX1GUiczGUwMjmBgDgKgY4VLsLi0iNBAjULn1crfM+Oaq1sxvAbrO0nQz1CqV8KTF4LtCTbciRtrrOy7CpwztA41KZZny5ZFrUqeg5SXj/iqQ4JbMBmFiNmkbAjl4KzqVLMcvg+Tjz9tjz2V2thS5+WAe410+Ln2PkB69UjhJqEjLZ2WGnNlPW+tyfVbfw5wJr69SvncABlfyzzmIBOoDct/wCqE0Y3F+BxT7QFosCc2kdbdYvE+yn4FgKlScjYaBd5gCd4G519V1uJ4KcW9jWg9k0iNACZ1c7yXV8OoDDd0ANytGwEkzYG/tZWWo48cObTol+XMWgQe9A8gNAsxzgb90k8pBtHPQeK7zijIY7EZrGQWwdQzTwIF53nXbzWi6A2bi+kfU+AVRXq0crnGDB1uDrBE+Z1UTarBUptlxNUkCBJgCXAyfJWHV9XNE2uJ68p6qvSqiZFo6+yit+lQa3LGgHmd+XU+m6v0MIHiT96QsKnjy59FrWFwe6HumzBGseP0PNdHSrBrhyhxsDB2jpp6pkz4usXjHBmuE5RoQDpY6ri8XhnUxIaRsQehsREWMDderYmkIF5H2Fz/E+EZwQLToeSk0ry3iQJIMESY8thfTXRdLw8d0eXkI/ZaHxFgGsYwTvB8bQ4cjP1VPCPZkzA30vaYsNd9FrdQOLHeMTtr4T+qgLVYqqIhEQEJoUhCaEERCGFJCFwQRkIS1TQgcEEJCSPKmhUdCllRBEtKjhLKjITQgAtTAIykAgBOihMohiFo8MblHaA6HQRtHP7ss4lW21DFNrWmSdbc9hEzpodJUpGlgsS7/U0Kob3AXDvBxZ3gRcgWGmn7QNr1KleriQMlGq0tytAdTD5a0F7BEiWOsYPekKvjsf2YLmOBLGuDWuBIcHNNOQR/LnDrm+UJ/hWs2lDC54dUIIdq02AyuEX+UQTNyVysbldnxK9HIZDw2GOExYfymzmzzvBWdwKs6rmDntLmkAtDS3s7TBmxvdWsPUa+tUpuDm5AxxcRIdmn5T0LSFaYKdPOWMhzjLiIBdaJcY1tG36pzJ4t6t9VDwplNtQ02AEnO4km7jAA6Xc0Qr2BwrKTW0hYXAmILiZJcTtJN1VxmNkNYLfieIIFiY0JJFxJtIgRIVlmMDs5vmgACBljUTN9LdL8lqc4zbrRwddrWtNN0yWgXBDTp+ERoLAkaclNiXNcyk6o50OzNEgZgZIHeaYLRBuNTHMxiiqMsSGmLyZEaxzvtA3Clw1WKWUufULnSzn3rPa28fhBzHSANgtIsYuuXUXta8ZWgkgwCcgkWi5N9ea8yc+dZA2HIRfTbU+QXoNUDITB0c92YtEhgLnD1+vkvMXOlvOcskDXqbcz7oiV1SY32+upGupCs0KOa5idjaB4A28AqDWmWxcm30j6laHDsIajmh1m2uLm5iADqbn3QXcLg8gJBLdw2NQCRPTlaytYfFVTVptGUsl2cmcw7vdj75c1sVsIajWgNIDWtbEgxaGwSZI2jrG1qNbh7mwRIMC2utxfbZSq1xTLQATYiWzOpNxO3+Eg3WfyWdhcbVc9jTHZta6QRLi8kBp6WJ9UPFeKtotLjeAbeqDjfi69U3PeAg7ZgDaPNZnCwQC03IPPluPFSY3Fmu/MbN1Gm+kKenTAyuvM5ZtqOnl9FUSvAlAVJUQFURQmKMoSFBGmcERQlACEpyhQMmKRTSg6FOCmTraiKZNKRKBFMEkpQOhKUpKJTFWsEHdsCHGAAG73Fxl5H/CrK5hWauJggHnEGI9+XRS+LAY3AviuZDnPo1GtaBIs+k9zQ4fK4Bk6EQD4iX4LouzMYbzMktMCJd5EDdScfrCh2bWOcwsbVDXNMTUqd3vgg93KXDzHJXPgrs6FA1XVHF1QBgYGueWhmoLdcxkX5Ln9xp0uJbboAY1mRabbqrUxDQJkSQQBBn/AK+qzq3xGBb/AE2IdP8AQ4A66A+SoYrjgJ/+nWncAAkCNjP6LTK/UxBJEZNTFu/sSQdATLvdSUsKSfxnSTGhuP8AkLrl6/HKk/wsC7NtJJcTpBAGg119FYpO4y7Nky0xJ+YNaeeUFzZIvrfTnKWjqBw10iSQSdoAO2npqrFHBZACHSLkui4kGJG9rbarkS7jlNsds14IIgupGRpGZ4zO3Gs9VI3404pRAbiMFSrQIz5croJmQ6kcoPlsJ6zP2OzmkAZNyx7TIj5mkaQSBoNb32uvLuzOaOVrmbTI8FtN+N6bzNbD1aMmTlBe0ja5hwjznpCwncTaXFzGPMmB8t77mTHmtDRoYcwHanw5QVbY+Lg7R1/xsswY0z/tAt5OrBu9/knbw8VbpcRqTanhm6DR7/GJdefDZB0/D8U4gtzTmu6csd0yAMwvr5+StYZ+UkEH8WaBuDPdnQzy5eS5rBY+v+KhRqNGvZv7J8RF/maDv8u2638LxamGkFtZny/gY5pdcO72eYsIkekIhYrC5YI05joZ9twuB+JKlQPcHuJuTa3dJsPRejDG0Xn52N5h4NMDQTLovvqd+q5/4v4VmpGsyJY2ZBBt80SPDrqoOPNOWgjbXkOVlawb8+UWlv0t9+SpMcBTvF7CfKT6bhTcIaQYPzfcqi69DCJyZUQvCZG5MoIiELwpoQOQQkIYUpCAhBE4KMqeEDmoOiIQQpkBC2qMpIiEwCASUyIhDCBJApihKgMlXeHkEuk7QNuXPRZpKKi+8e/hdS+ES8fDHMh5dncA7s23I7oJzHRv16brpP8Ax7XP+kcDb+IY1MEiYmVyfFcWWvaIbldmc7bUaHzHstX/AMeV3ZKrT8s5gfDTxWc+K6hxi5ceQvz2/wAwhfUJb3em5NrdPdQ16nW8G33uiYQG98xFx7bxZEVcVhM7YdLZO2vWJJ2RYLjFWnDCwVoa3MbsqN7sFzQ2zgHSP3BUteJc4hwIEbX1IvM6woOwc45czg4aOBIdbUzz6IC/+X4eT2jKrDawAtfaSCfCN/Wnxj4vYynmbh6on5TVLWl5zbMBLi2N4G3gc7ilfiTLU8Qx7ZgO7OmKg6GR9FzI4RXr1e86o97v9yo6SWtFjMmTbQJkGthsXWxLKuIqsEAHIA0Buad8oBdF7z+ZVLigIb2lMS3dpFo6TNl3TuGsHDar2wOzazK0Wy/xGNlxHQu8DK57B0pa4bSZ5X5dP1VwZmDxIqjNTh0CSyBnb5HXT2W5w59OQDVazT5qJtMDbU3PtdY+P+GznD6Ry31BIixIFt4Bg9IWlwyligIqPpuA0OTvW+9T1RG5UotkRUztGjm0uyE23N3ax6c1Lhm5xJt6kzzPl9FVo0SYLzOgE6N5wLAa9FsYKleNAe8Dpy/b9kDHDtI6nppr+ijGEYLZWkEQbC4Nr81cwVLMXXMa++6bEUcp+/dQebfF3Dw2swsEAy0NFgNCCNtyoOFNtmP6dPot/wCN3ZW0zAku3A5H78lz1GjUAFRt2ujeeenK+yotuTJ36pitIApnJyhKihKBxRFCQoGJQFOQhIQDKGU8QhJQdMhIRQmWwJCYBGUyCMhKEeVKEVEQge1TEKNwQRBpNgrFHCx3nE/2ixNtJ0BPP2UTHEGwB2vfVU6rnPc4OfedrRNrHy2WaHrYU1QNB3hcgHK0TMxvrbqFufBGJpxUpgjMLb7GBlG5iR/yWBhHHYEj5YmTJvdSfD3drF3ygEeoJHpH0WR272bgRN5nly6KzSomoGgEkk2vy1+niocSA1xiTMac+kevmo6PEKjS1oAyiWggSRrlnX2RWnicHlaSROsdSOWw3PmsXCVg9ucXEkHQFpaS0gidQQtZnGMwLHQRJlxJ1IB+XYz9fXJOWGtaBpo3mRmJtzJJOl3FVEGLObuNjvWMidbm45Cd7LW4HgWZyxj8wcw5zoflAIAi0X12AM7LmuIV3UjmyOBBMZhAJFxO/wBlHwb4sbnaHRSf3ZGoIJP5GfsqejqaBnDV6DRJfT2uZa4OJDRa52A5dIy/9BkwjKhkayTEF0TqLxAn7hR0MdAJbLSA4AzAtroOU/cpnYpjcE3vauGUX1gTbn8ojx6LV8QNDh0WJLXG8kuIM3iBpIG49lBhq0OLHAgg8o290HGPiOX/AMM96GAEiS0NY1oLmzrA0PK6zG4ouJeXEyZkn6xpokHSUXOMDTUxvOmp6LbwdZpDZFtIBE/MYMDo4eMDe65mjigRLddPA/n+62MBOQtNoc2/R4257BBbptyunPpPnpEn1Uz3EmT9wn4jh2sFiS4OvO4vH0PqFCypIvvGnLdSjk/jZ4im2JJd6WMrIw/+0LmLQOVp8xqtP47EOpQ4A5jYzBEX8Fl4aQxggi8E2dOo031U3FgIRFqvcQwwEOBAzAGNLGZJ2FxHoqTmkLU6liWWIyEJCkKEhVEQCYhG4JlFRQhIRuCZQR5VG5imcgIQdCkEgEy2HSCGU8oEmTykgAoSFIQmhFROsDGsGEeB4a4tNRwAGZs2u42+Xu94XE9SOaRCmo1AXZHTGQu5w490nzBHp4Ln3ufGuc36o4VjXVKzJAywToS6dAOnd9yqXDcVnxD5JIcdrXboQOt0sWx9N73NgtqCNNwecdfdNwDAXLye9BPQQdQOWirLu7OaL39xaxPoqffpPBeDldrE2Ai4A1kekqfB4guY10f0xsY6+Xupa4yu7sDrsLWj1E8ws1VSriwBfvN5yZIjmfH3VKljS1j307GJAsYG2uw/JDxCg4FxDTlJmDbLtrsJBNvdVqLiWVGgXOg1uTMG1tT6ha/hEHEsfiHNztc15yBzszQdDBEjxWDXx+JqNbNKk5ru8Dkv3QbzMj9QFHiOPVabn04aQA5mkWJJHS0qnT424NpMgZaTXtG0l2cgm14z2GlupQdVgMa92HGaZFi3cSbG86D6dFPxfGltKhTYGgNz5iZN3kAOEECcrd5181zuF4p2jHAgANLIHMEmTOs6zzslxDjxDg3I0hhtIy2Muy22BdM6qi46o9ofdsNAMhoBggkidYv9E1biD6ZpiQ4OaTdoFxeBl+qyK3HXu7QZGw8Rv3RYCDvv6osFinVT3wD2bXFsW2i6g6/E1MgDgLENNvAX91t/D3GMgIeMwMEgxAcC4iBNx3teoWLhzmYwkz3QD1AsHfX1VrC8PtY7yTGoPitI6LEcT7TL4zYak6elx6qdhAPUT69Vn4HDBkXlHiKuWTrZZo5X4wqsNWlnLu6bAbk3AJ8vZVWY3O2Wg906kAc75R1O5M9FS+Js1R2cG7XTHQfZQYOo35Z7r4jUbAERzkeymK2H8QOdrjYmTE2M3n3J5acr7WHZTqsqPc2X9k7ITu5ghxtYkAi/Qc1z1Joe1zHlstHK8EWd98iEPA+NBgFKwgEMM2bNjI5Hn+iz1z+GuevyIplZxFAg/LFpI5WnXcciqy6y6xQFM4IyhIREaEhGQhKio3qJwUxQEKDfTwmRLYGE0I5QlAwCSdJAyZJKUUxTl0NJibEa8429EJQ1HDzgxOm0/UKURcNa19PI6nmgyL5bvgyRflAjn0WtxnDsw0Pfc5Yyi3dcbt6mXRM6hYXDa1SnUDnNLmO74gXJBggwbWzH1T8Seao7WpaSMrb2BiXd68RfzWMXXpHDcFT7FhZdjxmBJuTH8vqouIcMzAlgveBsbaTtqq/w1iSKLcO8hrwe6dQ8CIg6Ai8j7Gy+xieRJEW5TspEcpUpOaDIiJBGs6QRKzM8OtpAmNZvsL7rsMXh8+pEDbe/gff9lh4nhcPhh/CTy0y21/q35laiMXC/DdN7w9zKNSXmo8moR3croaRmEQ4CYufZVj8KBtWm00GOD6jnHK4w2mC4hpcTYZWtPPvHWAtg8OsRlmbHb/KqDhWUzkeNYAeRGx0P3PVTFY2M+HKhzilhzTJe6DDspp5A+A51gAWkA8/RTngJ7OkThD2orEvM/PTzEEQ46ZTbwV2ph8sDPUZN/mdJjzURweYzne4c87vYAplXVHFcBd/GHYtbmMsiO7Zuh1F51UjuGvLadoc0QZgSCCDHnl9ArowA/qPiSfqVOyg3SAfFX/lnR4GmAWCbRGx3zbdLLSOIiAdoE8/LyCp0KMObBgTHKIuLrSoU2i5Ek2/f0V0FQzOuAY66Kpxl+VpIK0GEtF+Xh1+/Bcn8QcVLiWNFp1GpgjQcokqVWfiyJZJs6q0O/ti9z1csbAzDqcGzszNpg2uOcKcuL/ms2Tl2AGaTI3Jk+oVvCMBcHZQYJidHDQzGnjzA82CxmzhtQDvNgOvEib+YmfNQV6VKq8tY3LWaTDdG1JH4Ds/+nQ7clLQ/hVYHyumGkkgHeCfv8g4jhW1ZI7pEtJB2nu23E8+aWEHw7iTmNyunLpvI1kEHzU4AIkGQosx7V+HqOBrNIDajhDK4IBYH3llWCIfN7B2xVY1Cx1xlvBnQGbiSBDv6SkpYvJiEqbswtruNEntje6uojeVGVI4qNyASmKcppUHQQmKJKVsAlCNDCAISRJQgApIiEKBQsn4gp2Y41OzAJzG8kEaNaDLjbT3C11l/ENFrmU5me0YB5m8+UqVRYLECpWqsDBTbRcclyZcHODi5xsZLtoA5LWrcNpU6VHE1C9zTUytEgAU2ksc6150M2/M4vBR22NrUQC1hJJ/pyub2hMeB9ArfxhUNTM2m7u08oBaIa0MvM+I8dFj9LWvjmuZUdTa4w27Ysb6XtHj0WlwT4iaT2VYEOGlQbnkY33WG6swUgSczoku0OZ3eJdI6kCFmMw2ZwLxAcRDZ1AuX36iyeQejYlt5GnlBmIAhQtxAzHUEga2Av01NlQoPAFM0mlweXBwBGUECQRJmTyHI6aoadW5iTtB219D/AISVMaFeqBym28zPKBy38VVqO67x4c7hMGDcX3tAujFIBtrbrSBrU2kgASY8Yj8kD7aRp0RNpnNm0KTWEkunwnnI/VJBUc2+l9tpHn6oTTG4j7srr6Yu5xk7bePiq9ZhzRcRHoRIPpCoJtIAffgpc4br7+v6qKvXbTZLnAALl+IYupXJFNxytuTp7eGqzRp8X4q4hzaYubDk6bm+zR1XNYvC5HAA5tBm5f41V/DkCnBDw+TJ1BB0BH7IhRdlu23S3gis3izbZmgEi0TuNfEaqTAVaYDMuYVI714Enl03hCR/AL+ZhkCSb28ZIVarU7NwIIIMX1AMkRPkD4GFUaePpZwC0nM0gjadjf8AtlDlDXsdmBa9pa4DQkbzzu1XcHi2uytcNSJjlpIP3osulLqLhYupusI2BIE9Y3QN8QtDKrHuHcrUWAnbPTBomf8A89U1LEl/dcZq0xGY6vaNGVJsTAGV/kdlp8ecythaRa4EsLrbtnK9v/sai5LiWZlRtZts3WYIABafKPIhZs1qVuUqwY4EAgHQ/l0P343Q6dd99FSwFZtZogy6Pl/E4Nkkf3tuQfxCdxeZleBE216HrCzb/bU/xLXpGbafd5UJb6KaZEi4F428uSTyOUHlP0V561OucVy1BCkc0qMrTDdlJCSlK2HlLMgJSlAeZPKilPKA0yCU+ZFPKz+LNk0Dyr0z7x+avyq+LwzqhpBuva0iP+4H5qXwnrTwXCjhH4uq9sh1erTaBrlDiZHUx7FUqDRUY8uJyvaO6HD+XvE2gGQROwPOCi+IONF2J7InPDntlsBrSJzONtSVSwWCcQ1sQyJJmHRawPIysT9rfVh+LpthtOmXWiSJk/coclQlrqrQHiwbJzANnUDRsachHgrNasWMAaAXOgATmOguTz3Q4DAEE1K0Pe4CGz3RF7eZ9fRVGngMaGVqTQIaHEA84a3M88sxqOtyDeS2fiajUFM1MOwPqgtkaZmzcHn08Vl4Lif+mPaNa0Og3cxpaQZBlp28eS08PxHMAxxgnKRNpuDB5Fc7M+tbA08R8oqMNN5aHFh5kaAze5uNbKZ9I+Vrq9iaIqNLXAHx2OxBGh6rDocPxVFrWmu2t8xh7dADEZgdQMsyNwrOvymLTmkbR7qNzSdYA5e2qhqY59Npe+iJGsPJ/wDUtB1OiCpxXMAWtaBr8xdqLWy69F0nUTBVATqNLb3jxWfjsb2LSfmdFm7n9NFW4rjazntAcA0DYEHNewM2/O6GjhGtcc13CDoTfa/PqmpgcK8OkPcHucA4zYNMfKA75j1sic0CQ02sDb09iPToqfEahDgSJJ7pjeL+f7pncQbTb8pzaaHnl56qRUtPDZiW5wGNcDDhcmDAkFFixlY+LAN9Ztbz+91Q4diC0vDxBJP9sayPvZV+NcSDmvYLR5WvB+noiCwDc9Ps2ukAAATBgy2QQdy13kFRp1i4tpz4gCPl1EbCRorXw8+G3F7ADSQ0Eieol11E2iG4lxF+77uMx00KCzg2AzaDoNr35eX3ZXcAMufNEHK483ZTljrZZ+AA7QtuCTmbrpvp5rSIl7Tr84I1kEa+EqhYWgOyr0wwy2Ht6Qee3dcT5embhqPatdQIBDzLbXFQaQdswtHPL1Ww6QQ5uj6ZJ3Ga7XexWC8FrrfofLqs3xYxeHVjQrtJMZXRPLk4exXX4+gDDwIY4nMB+B+jiOlwY5EclhfE+HDsuIaIzWeOTx831B/5Rstf4axJfTyO/tPQiQ13vlPjOy59X5OnXme8oiYMAgHUXtPI9DzVijUaRDxB5HURrpr5KJ1MDabkEHWRI9LaIXUht6fehVnMs+J11Zfo6lGNDLeevuo4H2Upc35SJ5GYPnt6Ic4gHK4HlAt7wrvUTOa2CEKSS7OZkkySKScJkkBJkkkCU+BP8akeVRh9HT+SZJZ68J7GT8LYRtV1auTd1R0GNASXR5322WnXq5JB73ttEe30SSUgrcHquc2tV0IcGtFp0kkHawCuPqwB3rEQLTO/LndJJBTrM7QQ6oQ3Rx5RIsN9D6dUm1cjy8kllMt6E+NpSSQdhguM9q0ZA0EgkZs0wNTawUL+MyLAZxmIAmDknNrzbmHk3kkksSNapYrEvrAup91zRcdNoP3osaniXCZGSJP8wJ1Pt9fJJJbjJq2LhlwDEtBM/vr05IRXzOBDozEC/wBdL6pJKiTE4Yg990/ikchA35fkontaQ0bEbiRNnAgbCSfQJJIiKrQz0gQQCDB31IB8RJBVf4o4M2ixtUSZaWO8YLgY+9EklLforcFJmnM3bqPED3T42BXJAibT1AH6e6dJULBV2ivlJvdu5BaYdHQ2P3ZaZw81qQLiBy/pN5/K6SSCfh+JFSlBN6dRzeVi6Nhpp6LM4hhjdw/AcrhyIJAPXSEkln+WozcfiJwzgRIcW7/K5pN+tpHn0Q8LxzaYzGRIh41kRqEklM2WNbllbVN/aEVCbuLRP8zicoLrA3kSfEp6oAjkbhJJY49a78QFMQkkuzi//9k=",
          description: "Ritual masks with natural materials.",
          location: "Papua New Guinea",
          significance: "Complex ceremonial art forms"
        },
        {
          year: "1850 CE",
          artifact: "Fijian War Clubs",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIBpJpqq0uM13XaEmW1OtCX8Cp0oP_n1vkg&s",
          description: "Intricately carved wooden weapons.",
          location: "Fiji",
          significance: "Peak of ceremonial woodcarving"
        },
        {
          year: "1900 CE",
          artifact: "Torres Strait Masks",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRP25qQYQ9TaYCZpDOrkfgYLy8YbOYS3nZLw&s",
          description: "Turtle shell and wood ceremonial masks.",
          location: "Australia",
          significance: "Unique fusion of materials"
        }
      ]
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const middleY = window.innerHeight / 2;

      eventRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const eventMiddle = rect.top + rect.height / 2;
        
        if (eventMiddle > timelineRect.top && eventMiddle < middleY + rect.height) {
          setActiveTimelineItem(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedContinent]);

  const scrollToTimeline = (continentId: string) => {
    setSelectedContinent(continentId);
    setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const renderContinent = (id: string, data: ContinentData) => (
    <div
      key={id}
      className="relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 group"
      onClick={() => scrollToTimeline(id)}
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
        <div className="p-4 md:p-6 w-full">
          <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{data.name}</h3>
          <p className="text-stone-200 text-sm line-clamp-2 md:line-clamp-none">
            {data.description}
          </p>
          <button className="mt-3 px-4 py-2 bg-amber-700/90 text-white rounded-lg text-sm hover:bg-amber-800 transition-colors">
            View Timeline
          </button>
        </div>
      </div>
    </div>
  );

  const renderTimeline = (events: TimelineEvent[]) => (
    <div className="relative mt-12" ref={timelineRef}>
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-amber-700 transform md:-translate-x-1/2" />
      
      {events.map((event, index) => {
        const isActive = activeTimelineItem === index;
        
        return (
          <div
            key={index}
            ref={el => eventRefs.current[index] = el}
            className={`relative flex flex-col md:flex-row md:items-center mb-16 ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            } transition-opacity duration-500 ${
              isActive ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div
              className={`w-full md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}
            >
              <div className={`bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${
                isActive ? 'transform scale-105 shadow-2xl' : ''
              }`}>
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.artifact}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-amber-700/90 text-white px-3 py-1">
                    {event.year}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif text-stone-800 mb-2">
                    {event.artifact}
                  </h4>
                  <p className="text-stone-600 mb-4 text-sm md:text-base">
                    {event.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-stone-500">
                      <MapPin size={16} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700">
                      <Book size={16} />
                      <span className="text-sm italic">{event.significance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-700 rounded-full shadow-lg transition-all duration-300 hover:scale-150 hover:bg-amber-600" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="pt-16">
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-6">Global Artifact Evolution</h1>
            <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
              Explore how artifacts and craftsmanship evolved across different regions throughout history
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {Object.entries(continentsData).map(([id, data]) =>
              renderContinent(id, data)
            )}
          </div>

          {selectedContinent && (
            <div className="mt-16 scroll-mt-24" id="timeline">
              <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-8">
                {continentsData[selectedContinent].name} Artifact Timeline
              </h2>
              {renderTimeline(continentsData[selectedContinent].timeline)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CulturalMapping;