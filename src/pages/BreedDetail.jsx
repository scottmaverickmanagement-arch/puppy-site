import React, { useEffect, useState } from 'react';

// IDs must match exactly with Home.jsx breeds array
const breedsData = [
  {
    id: 1, name: 'French Bulldog', card: '/assets/frenchie-card.jpg', bg: '/assets/frenchie-bg.jpg',
    desc: 'The French Bulldog is a breed of domestic dog bred to be companion dogs. Known for their distinctive "bat ears" and playful, affectionate temperament, they are excellent city pets that adapt well to apartment life. They are sweet, playful, and completely irresistible — a big personality packed into a small package.',
    para2: 'Frenchies are known for their easy-going nature and don\'t require a lot of outdoor exercise, making them perfect for urban dwellers. They form strong bonds with their owners and are known for their clownish personality that keeps families entertained for hours.',
    para3: 'Despite their sturdy build, French Bulldogs are sensitive dogs that thrive on human contact. They are intelligent and can be trained with patience, though they do have a stubborn streak that adds to their considerable charm.'
  },
  {
    id: 2, name: 'Labrador Retriever', card: '/assets/lab-card.jpg', bg: '/assets/lab-bg.jpg',
    desc: 'The Labrador Retriever is a British breed of retriever gun dog developed in the United Kingdom from fishing dogs imported from the colony of Newfoundland. Labradors are famously friendly, active companions who bond with the whole family.',
    para2: 'Labs are the most popular dog breed in many countries for good reason. They are outgoing, high-spirited, and have boundless energy for play and adventure. Their gentle mouth was developed for retrieving game without damage, making them incredibly gentle with children.',
    para3: 'Labradors excel in many roles — from search and rescue to therapy work and competitive obedience. Their intelligence, eagerness to please, and natural retrieving instinct make them one of the most versatile and beloved breeds in the world.'
  },
  {
    id: 3, name: 'Golden Retriever', card: '/assets/golden-card.jpg', bg: '/assets/golden-bg.jpg',
    desc: 'The Golden Retriever is a sturdy, muscular dog of medium size, famous for the dense, lustrous coat of gold that gives the breed its name. They are friendly, reliable, and incredibly trustworthy — a true friend to everyone they meet.',
    para2: 'Goldens are outgoing, trustworthy, and relatively easy to train, making them one of the most popular family breeds in the world. They are naturally patient with children and get along wonderfully with other pets.',
    para3: 'Originally bred for retrieving game during hunts, Golden Retrievers are now equally at home as therapy dogs, service animals, and devoted family companions. Their gentle demeanor and intelligence make them exceptionally versatile.'
  },
  {
    id: 4, name: 'German Shepherd', card: '/assets/gsd-card.jpg', bg: '/assets/gsd-bg.jpg',
    desc: 'The German Shepherd Dog is a breed of medium to large-sized working dog that originated in Germany. Known for their strength, intelligence, and obedience, they are the preferred breed for many types of work including police, military, and service roles.',
    para2: 'German Shepherds are incredibly versatile — equally capable as loving family protectors and professional working dogs. Their courage and devotion are legendary, and they form unbreakable bonds with their handlers and families.',
    para3: 'With proper training and socialization, German Shepherds are gentle, loyal, and deeply affectionate companions. They are highly trainable and eager to learn, making them excellent for both first-time and experienced dog owners who can meet their exercise needs.'
  },
  {
    id: 5, name: 'Poodle', card: '/assets/poodle-card.jpg', bg: '/assets/poodle-bg.jpg',
    desc: 'Poodles are famous for their intelligence and ease of training. They are lively, active, and fun-loving dogs with a sense of the ridiculous. Coming in three sizes — Toy, Miniature, and Standard — there is a Poodle for every lifestyle.',
    para2: 'Don\'t let their elegant appearance fool you — Poodles are remarkably athletic and surprisingly tough. Originally bred as water retrievers, they are strong swimmers and excel in agility, obedience, and tracking.',
    para3: 'Poodles are hypoallergenic, making them an excellent choice for allergy sufferers. Their curly, non-shedding coat requires regular grooming, but their warmth, loyalty, and playful spirit more than make up for the maintenance.'
  },
  {
    id: 6, name: 'Dachshund', card: '/assets/dachshund-card.jpg', bg: '/assets/dachshund-bg.jpg',
    desc: 'The Dachshund, also known as the wiener dog or sausage dog, is a short-legged, long-bodied hound-type dog breed. They may be smooth-haired, wire-haired, or long-haired. Bold and curious, they were originally bred to flush out badgers and other tunnel-dwelling animals.',
    para2: 'Despite their small size, Dachshunds have a big personality and a surprisingly loud bark. They are brave to the point of rashness and can be quite stubborn, but their devotion to their family is absolute.',
    para3: 'Dachshunds are playful, clever, and tireless companions. Their unique silhouette and spirited personality have made them one of the most iconic and beloved dog breeds in the world.'
  },
  {
    id: 7, name: 'Beagle', card: '/assets/beagle-card.jpg', bg: '/assets/beagle-bg.jpg',
    desc: 'The Beagle is a breed of small hound similar in appearance to the much larger foxhound. A scent hound developed primarily for hunting hare, the Beagle has a great sense of smell and superior tracking instincts — inquisitive hunters with a friendly disposition and a merry heart.',
    para2: 'Beagles are pack animals and thrive in the company of other dogs and people. They are happy-go-lucky, funny, and incredibly cute — which is good because their nose can sometimes lead them into mischief.',
    para3: 'Known for their melodious bay and expressive eyes, Beagles are wonderful family dogs. They are great with children and have an even temperament that makes them adaptable to many living situations.'
  },
  {
    id: 8, name: 'Rottweiler', card: '/assets/rottie-card.jpg', bg: '/assets/rottie-bg.jpg',
    desc: 'The Rottweiler is a breed of domestic dog regarded as medium-to-large. Powerful protectors with a soft side for family, they are known for being calm, confident, and courageous. Their natural guarding instincts make them devoted sentinels.',
    para2: 'Rottweilers are among the most loyal breeds, forming deep bonds with their families. Despite their intimidating appearance, well-socialized Rotties are gentle, playful, and affectionate — especially with children they\'ve grown up with.',
    para3: 'Originally used to herd livestock and pull carts for butchers, Rottweilers have retained their strong work ethic. They excel in obedience training and are eager to have a job to do, making them wonderful companions for active owners.'
  },
  {
    id: 10, name: 'Bulldog', card: '/assets/bulldog-card.jpg', bg: '/assets/bulldog-bg.jpg',
    desc: 'The Bulldog is a British breed of dog of mastiff type. It is a medium-sized, muscular dog with a wrinkled face and a distinctive pushed-in nose. Easygoing companions who love a good nap, Bulldogs are kind but brave.',
    para2: 'Bulldogs have a longstanding association with determination and courage. Despite their tough appearance, they are among the most gentle and affectionate of all breeds, forming strong bonds with children and adults alike.',
    para3: 'Modern Bulldogs are calm, dignified, and wonderfully low-maintenance companions. They don\'t need a lot of exercise and are perfectly content lounging at home, making them ideal apartment pets and loyal family members.'
  },
  {
    id: 11, name: 'G.S. Pointer', card: '/assets/gsp-card.jpg', bg: '/assets/gsp-bg.jpg',
    desc: 'The German Shorthaired Pointer is a medium to large sized breed developed in the 19th century in Germany for hunting. A versatile and multipurpose gun dog suitable for both land and water, they are known for their power, speed, and endurance.',
    para2: 'GSPs are high-energy athletes that thrive on activity. Whether it\'s running, swimming, hiking, or hunting, these dogs are always ready for adventure. Their enthusiasm is contagious and they make incredible companions for active families.',
    para3: 'German Shorthaired Pointers are friendly, smart, and willing to please. They are highly trainable and form strong bonds with their owners. Their striking appearance and tireless energy make them stand out in any setting.'
  },
  {
    id: 12, name: 'Yorkshire Terrier', card: '/assets/yorkie-card.jpg', bg: '/assets/yorkie-bg.jpg',
    desc: 'The Yorkshire Terrier is one of the smallest dog breeds of terrier type. Developed during the 19th century in Yorkshire, England, they are sprightly and tomboyish — a big-city attitude in a tiny, glamorous package.',
    para2: 'Yorkies may be small but they have a giant personality. They are brave, determined, and fiercely loyal to their owners. Their beautiful silky coat and confident carriage give them an air of importance that is hard to resist.',
    para3: 'Despite their toy-dog classification, Yorkies retain their terrier spirit — they are energetic, curious, and always up for an adventure. They make excellent watchdogs and devoted lap companions in equal measure.'
  },
  {
    id: 13, name: 'Cavalier King Charles Spaniel', card: '/assets/cavalier-card.jpg', bg: '/assets/cavalier-bg.jpg',
    desc: 'The Cavalier King Charles Spaniel is a small spaniel classified as a toy dog. Known for their graceful, gentle demeanor, they are the perfect lap dog with a sweet soul — affectionate and eager to please everyone they meet.',
    para2: 'Cavaliers are adaptable dogs that are equally happy on a long walk or curled up on the sofa. Their expressive round eyes and silky coat give them an irresistible appeal that has charmed royalty and commoners alike for centuries.',
    para3: 'These gentle spaniels are wonderful with children, seniors, and other pets. They are remarkably intuitive to their owner\'s emotions, making them exceptional therapy and comfort dogs. Their love is truly unconditional.'
  },
  {
    id: 14, name: 'Siberian Husky', card: '/assets/husky-card.jpg', bg: '/assets/husky-bg.jpg',
    desc: 'The Siberian Husky is a medium-sized working sled dog breed belonging to the Spitz genetic family. Recognizable by their thickly furred double coat, erect triangular ears, and distinctive markings, Huskies are strikingly beautiful and full of wild energy.',
    para2: 'Originally bred to pull sleds over long distances in harsh Arctic conditions, Huskies have retained their incredible endurance and love of running. They are social, playful, and mischievous — never a dull moment with a Husky around.',
    para3: 'Huskies are known for their striking blue or multi-colored eyes and their wolf-like appearance. They are friendly with everyone, making them poor guard dogs but excellent companions for those who can match their adventurous spirit.'
  },
  {
    id: 15, name: 'Boxer', card: '/assets/boxer-card.jpg', bg: '/assets/boxer-bg.jpg',
    desc: 'The Boxer is a medium to large, short-haired dog breed of mastiff-type developed in Germany. High-spirited athletes who live for family fun, Boxers are often called the "Peter Pan" of the dog world because they remain puppy-like for years.',
    para2: 'Boxers are stocky, powerful dogs with a playful and energetic personality. They are patient and protective with children, making them one of the best family dog breeds. Their goofy expressions and boundless energy are endlessly entertaining.',
    para3: 'Despite their athletic build, Boxers are sensitive, loyal, and deeply attached to their families. They are intelligent and respond well to firm, fair training. Their courage and alertness also make them excellent watchdogs.'
  },
  {
    id: 16, name: 'Pomeranian', card: '/assets/pom-card.jpg', bg: '/assets/pom-bg.jpg',
    desc: 'The Pomeranian is a breed of dog of the Spitz type named for the Pomerania region in Central Europe. Classed as a toy dog, the Pomeranian is descended from larger Spitz-type dogs. Bold, lively, and incredibly smart — tiny but mighty.',
    para2: 'Pomeranians have a personality that far outweighs their small size. They are confident, curious, and always ready to explore. Their luxurious double coat and fox-like face make them one of the most visually striking toy breeds.',
    para3: 'Despite their diminutive stature, Pomeranians are alert and make excellent watchdogs. They are loyal, affectionate, and love being the center of attention. Their intelligence and eagerness to learn make them surprisingly easy to train.'
  },
];

const BreedDetail = () => {
  const [breed, setBreed] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const id = parseInt(path.split('/').pop());
    const found = breedsData.find(b => b.id === id);
    setBreed(found);
    window.scrollTo(0, 0);
  }, []);

  if (!breed) return <div style={{ padding: '100px', textAlign: 'center', fontSize: '1.5rem' }}>Breed not found. <a href="/">Go Home</a></div>;

  return (
    <div className="breed-detail-page">
      <section className="breed-hero" style={{ backgroundImage: `url(${breed.bg})` }}>
        <div className="breed-hero-overlay"></div>
        <div className="container">
          <h1 className="breed-title">{breed.name}</h1>
        </div>
      </section>

      <section className="breed-content section-padding">
        <div className="container grid-2">
          <div className="breed-image-wrapper">
            <img src={breed.card} alt={breed.name} className="breed-main-img" />
          </div>
          <div className="breed-info">
            <h2 className="section-title">About the {breed.name}</h2>
            <p className="breed-desc">{breed.desc}</p>
            <p className="breed-desc">{breed.para2}</p>
            <p className="breed-desc">{breed.para3}</p>
            <a href="/listings" className="btn-primary">View Available {breed.name}s</a>
          </div>
        </div>
      </section>

      <style>{`
        .breed-detail-page {
          background: #fff;
          color: #333;
        }
        .breed-hero {
          height: 50vh;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .breed-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
        }
        .breed-title {
          position: relative;
          z-index: 2;
          color: #fff;
          font-size: 5rem;
          font-family: var(--font-headings);
          text-transform: uppercase;
          text-align: center;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        .breed-main-img {
          width: 100%;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        .breed-desc {
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 25px;
          color: #555;
        }
        .section-title {
          margin-bottom: 30px;
          font-size: 2.5rem;
        }
        @media (max-width: 992px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .breed-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BreedDetail;
