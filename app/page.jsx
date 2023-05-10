import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center" style={{fontSize: '2em'}}>
        {/* Discover & Share
        <br className="max-md:hidden" /> */}
        <span className="orange_gradient text_center">Sistema Grabaciones CRP</span>
      </h1>
      {/* <p className="desc text-center">
        En este sistema podras filtrar las grabaciones segun tus necesidades y decargar todas las que selecciones.
      </p> */}
      <Feed/>
    </section>
  );
};

export default Home;
