// export function Home() {
//   return (
//     <div>
//       <p>
//         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quas
//         vitae, praesentium maxime vero fugiat mollitia aspernatur autem ipsam
//         quae sint exercitationem laudantium asperiores ab cumque quos!
//         Veritatis, quas temporibus? Illo ratione dolorem, suscipit provident
//         exercitationem sed, itaque culpa ipsam, deleniti aliquam reprehenderit.
//         Animi quidem culpa sed vitae facilis fuga, quam cum ex. Veritatis
//         ducimus sapiente perspiciatis facilis dolorum earum. Cum facilis eius
//         cumque pariatur laudantium minima, ipsum labore consequuntur totam animi
//         sint. Laboriosam illo dolores doloribus praesentium non molestiae,
//         reprehenderit qui maiores. Vitae molestias asperiores quae deleniti,
//         repellat corporis. In tempora assumenda molestiae. Odit blanditiis
//         praesentium eligendi culpa itaque illo officia commodi ipsum pariatur
//         alias. Quibusdam temporibus voluptatem dolore amet rem velit, illo,
//         facilis asperiores, sapiente at commodi. Maiores!
//       </p>
//     </div>
//   );
// }


import React from 'react';
import './Home.css'; // Import CSS file for styling

export function Home() {
  return (
    <div className="container">
      <div className='image'></div>
      <header>
        <h1>Welcome to Our Leasing Office</h1>
        <p>Your One-Stop Destination for Quality Living Spaces</p>
      </header>
      <section>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          malesuada ex in ante vestibulum, nec condimentum libero
          condimentum. Sed ultricies velit et purus fringilla tempus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias odit, nisi quaerat rem corrupti at soluta quasi libero quia modi quam atque obcaecati laborum, beatae, optio eos est nostrum repellat.
        </p>
      </section>
      <section>
        <h2>Our Services</h2>
        <ul>
          <li>Modern and Spacious Apartments</li>
          <li>24/7 Security and Maintenance</li>
          <li>Community Amenities (Pool, Gym, etc.)</li>
          <li>Convenient Location Near Shops and Restaurants</li>
        </ul>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@leasingoffice.com</p>
        <p>Address: 123 Main Street, City, Country</p>
      </section>
      <footer>
        <p>&copy; 2024 Leasing Office. All rights reserved.</p>
      </footer>
    </div>
  );
}
