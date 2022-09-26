import "./Catalogue.css";

function Catalogue({ onCatalogueClick }) {
  return (
    <section className="catalogue" id="the-catalogue">
      <figure>
        <img
          onClick={() =>
            onCatalogueClick(
              "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/yeezy_boost_700_carbon_blue/offsets.json"
            )
          }
          alt="carbon-blue"
          src="https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/yeezy_boost_700_carbon_blue/shoeIcon.png"
        />
        <figcaption>Carbon Blue</figcaption>
      </figure>
      <figure>
        <img
          alt="air-jordan"
          onClick={() =>
            onCatalogueClick(
              "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/air_jordan_1_turbo_green/offsets.json"
            )
          }
          src="https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/air_jordan_1_turbo_green/shoeIcon.png"
        />
        <figcaption>Air Jordan 1</figcaption>
      </figure>
      <figure>
        <img
          onClick={() =>
            onCatalogueClick(
              "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/jordan_off_white_chicago/offsets.json"
            )
          }
          alt="off-white"
          src="https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/jordan_off_white_chicago/shoeIcon.png"
        />
        <figcaption>Off-White</figcaption>
      </figure>
    </section>
  );
}

export default Catalogue;
