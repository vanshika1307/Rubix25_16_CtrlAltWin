export const Hero = () => {
  return (
    <>
      <div id="hero-bg" className="h-screen flex flex-col px-5">
        <div className="hero-content my-auto w-[60%] ml-5 text-gray-600">
          <h3 className="text-7xl font-bold">Protecting nature for a Sustainable Future</h3>
          <p className="my-4 tracking-wider font-semibold text-gray-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae consequuntur temporibus eius repudiandae
            quam, et, neque odit velit soluta mollitia omnis sit nemo officiis commodi eligendi natus dolorum dicta non
            praesentium? Id exercitationem, sed voluptatem labore tempore nihil quae reiciendis.
          </p>
          <button className="hero-cta bg-black text-white px-5 py-2 rounded-full shadow-lg">See more</button>
        </div>
      </div>
    </>
  );
};
