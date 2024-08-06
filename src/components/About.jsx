import "../App.css";
export default function About() {
  return (
    <div>
      <div className="about-section">
      <div className='image'></div>
        <h2>About Deccan Pacific</h2>
        
        <p>
          Welcome to Deccan Pacific, where luxury meets community living.
          Nestled in the heart of [City/Region], Deccan Pacific offers an
          unparalleled living experience that combines modern amenities with
          serene surroundings.
        </p>

        <div className="vision-mission">
          <h3>Our Vision</h3>
          <p>
            At Deccan Pacific, our vision is to create a vibrant and inclusive
            community where residents feel a sense of belonging and pride in
            their surroundings. We strive to foster an environment that promotes
            well-being, connectivity, and sustainable living.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to provide high-quality, sustainable homes that
            exceed our residents expectations. We are committed to delivering
            exceptional service, fostering a sense of community, and enhancing
            the quality of life for all our residents.
          </p>
        </div>

        <div className="amenities">
          <h3>Amenities</h3>
          <ul>
            <li>
              <strong>Modern Living Spaces:</strong> Our homes are designed with
              meticulous attention to detail, featuring contemporary
              architecture and high-end finishes.
            </li>
            <li>
              <strong>Community Spaces:</strong> From lush green parks to
              state-of-the-art recreational facilities, Deccan Pacific offers
              ample opportunities for residents to socialize, relax, and enjoy
              outdoor activities.
            </li>
            <li>
              <strong>Convenient Location:</strong> Situated in close proximity
              to [major landmarks, schools, shopping centers, etc.], Deccan
              Pacific provides easy access to everything you need for a
              comfortable lifestyle.
            </li>
          </ul>
        </div>

        <div className="sustainability">
          <h3>Sustainability</h3>
          <p>
            At Deccan Pacific, we are committed to environmental responsibility
            and sustainability. Our community features energy-efficient
            appliances, green spaces, and initiatives aimed at reducing our
            carbon footprint.
          </p>
        </div>

        <div className="resident-experience">
          <h3>Resident Experience</h3>
          <p>
            We prioritize the well-being and satisfaction of our residents above
            all else. Our dedicated management team is always on hand to address
            any concerns and ensure that every resident enjoys a seamless living
            experience.
          </p>
        </div>

        <div className="get-in-touch">
          <h3>Get in Touch</h3>
          <p>
            Experience the unparalleled luxury and community living at Deccan
            Pacific. Contact us today to schedule a tour and discover your dream
            home.
          </p>
        </div>
      </div>
    </div>
  );
}
