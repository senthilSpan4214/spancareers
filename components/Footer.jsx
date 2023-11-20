const Footer = () => {
  return (
    <footer className=" bg-blue-500 text-white p-4 block  bottom-0 min-w-full">
      <div className="container mx-auto mb-auto max-w-screen-xl">
        <div className="text-center">
          <p>
            Copyrights &copy; {new Date().getFullYear()},
            SPAN Technology Services Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
