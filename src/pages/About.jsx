import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Bombay Fish Suppliers</title>
        <meta name="description" content="Learn about Bombay Fish Suppliers - serving fresh seafood since 1990 with commitment to quality and sustainability." />
      </Helmet>
      
      <div className="page">
        <div className="container">
          <div className="page__header">
            <h1 className="page__title">About Bombay Fish Suppliers</h1>
            <p className="page__subtitle">Serving Fresh Seafood Since 1990</p>
          </div>

          <div className="about">
            <div className="about__content">
              <div className="about__section">
                <h2 className="about__section-title">Our Legacy</h2>
                <p className="about__text">
                  Since 1990, Bombay Fish Suppliers has been the trusted name in premium seafood across Mumbai and beyond. 
                  What started as a small family-run business has grown into one of the most respected seafood suppliers 
                  in the region, known for our unwavering commitment to quality, freshness, and sustainability.
                </p>
                <p className="about__text">
                  For over three decades, we've built relationships with local fishermen and sustainable fishing communities, 
                  ensuring that every piece of seafood we deliver meets the highest standards of quality and freshness. 
                  Our journey from a modest fish stall to a premier seafood supplier reflects our dedication to excellence 
                  and the trust our customers have placed in us.
                </p>
              </div>

              <div className="about__section">
                <h2 className="about__section-title">Our Commitment</h2>
                <div className="about__grid">
                  <div className="about__card">
                    <h3>Freshness Guaranteed</h3>
                    <p>We source directly from local fishing communities daily, ensuring you get the freshest seafood possible.</p>
                  </div>
                  <div className="about__card">
                    <h3>Sustainable Practices</h3>
                    <p>We work with fishermen who follow sustainable fishing methods to protect marine ecosystems.</p>
                  </div>
                  <div className="about__card">
                    <h3>Quality Assurance</h3>
                    <p>Every product undergoes strict quality checks to ensure it meets our premium standards.</p>
                  </div>
                  <div className="about__card">
                    <h3>Customer First</h3>
                    <p>Your satisfaction is our priority. We're committed to providing exceptional service and products.</p>
                  </div>
                </div>
              </div>

              <div className="about__section">
                <h2 className="about__section-title">Why Choose Us</h2>
                <p className="about__text">
                  At Bombay Fish Suppliers, we don't just sell seafood – we deliver an experience. Our team of experts 
                  carefully selects each fish, ensuring it meets our rigorous standards for size, quality, and freshness. 
                  Whether you're a home cook looking for the perfect catch or a restaurant seeking reliable supply, 
                  we have the expertise and inventory to meet your needs.
                </p>
                <p className="about__text">
                  Our state-of-the-art storage facilities and temperature-controlled logistics ensure that your seafood 
                  arrives in perfect condition, maintaining its natural flavor and nutritional value. We believe that 
                  great seafood starts with great sourcing, and we've spent over 30 years perfecting that process.
                </p>
              </div>

              <div className="about__section">
                <h2 className="about__section-title">Our Values</h2>
                <div className="about__values">
                  <div className="about__value">
                    <h4>Integrity</h4>
                    <p>We believe in honest business practices and transparent sourcing</p>
                  </div>
                  <div className="about__value">
                    <h4>Excellence</h4>
                    <p>Every product must meet our uncompromising quality standards</p>
                  </div>
                  <div className="about__value">
                    <h4>Sustainability</h4>
                    <p>Protecting our oceans for future generations</p>
                  </div>
                  <div className="about__value">
                    <h4>Community</h4>
                    <p>Supporting local fishing communities and building lasting relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
