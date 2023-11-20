import Link from "next/link";

const about = () => {
  return (
    <>
      <div className="p-8 min-h-screen  bg-gradient-to-b from-gray-100 to-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8">
          <p className="text-blue-600 p-3">About Us</p>A team of passionate
          people who build products that exceed customer expectations.
        </h1>
        <div className=" w-fit items-center justify-center text-center">
          <p className="text-xl text-center mb-8 p-3 w-4/5 ml-40">
            <p>
              The year was <span className=" font-bold">2009</span>, and our
              co-founders,{" "}
              <span className=" font-bold">
                Naga and Agie, both joined together and formed SPAN
              </span>
              . Naga decided to lead the product development from India, and
              Agie to lead the marketing and customer support from the United
              States.
            </p>
            <br></br>
            <p>
              Our founders didn’t rely on any venture capitalist to run the
              business. Instead, they have put everything they earned into
              starting SPAN. Our first office in Rock Hill, South Carolina, was
              10x10 room size, and we started our development center in Chennai
              with only seven people.
            </p>
            <br></br>
            <p>
              <span className=" font-bold">
                {" "}
                In 2010,Sanjeev joined hands with our founders
              </span>{" "}
              and commenced his journey with SPAN as Managing Director,
              strengthening the organization further in each and every aspect by
              taking accountability for the overall operations of SPAN.
            </p>
            <br></br>
            <p>
              With over 30+ combined years of experience from these experts,
              <span className=" font-bold">
                {" "}
                SPAN Technology is now one of the most successful product
                development companies in India.
              </span>{" "}
              For more than 13 years, we've worked to help our customers solve
              their problems, delivering the best possible customer experience,
              and improving it every day.
            </p>
            <br></br>
            <p>
              <span className=" font-bold">
                {" "}
                We strongly believe in our employees, the products we develop,
                and the customers;
              </span>{" "}
              thus, they are paying us back to keep our operations constantly
              growing. This helps us provide our customers with the best
              experience and good company culture for our employees.
            </p>
            <br></br>
            <p>
              This commitment has taken us to a $10M annual revenue-making
              company with 300+ employees. We are proud that we have expanded
              our operations in Chennai, Coimbatore, and Erode.
            </p>
            <br></br>
          </p>
        </div>
        <div className="text-3xl font-bold text-center mb-8">
          <h1 className=" p-2">Ready to be a part of a world-class team?</h1>
          <p className="p-3">
            <Link
              href={`/`}
              className="btn bg-blue-500 text-white hover:bg-green-800  border-0 hover:border-0 hover:text-white"
            >
              See our open positions
            </Link>
          </p>
        </div>
        <div className="text-3xl font-bold text-center mb-8">
          <h1 className=" p-2">Know more about Span?</h1>
          <p className="p-3">
            <Link
            target="_blank"
              href={`https://www.spantechnologyservices.com`}
              className="btn bg-blue-500 text-white hover:bg-green-800  border-0 hover:border-0 hover:text-white"
            >
              See our website
            </Link>
          </p>
        </div>
        <h1 className="text-2xl font-bold italic text-center mb-2">
          <p className="text-blue-600 p-2">Locations</p>
        </h1>
        <div className="flex justify-between p-5 mx-32 shadow-2xl rounded-lg">
          <div className=" text-center p-1 pl-20">
            <p className="text-2xl font-bold mb-4 shadow-inner p-1 rounded-md">
              Chennai
            </p>
            <p className=" text-xl">
              {" "}
              Zenith Building,<br></br>
              International Tech Park,<br></br> CSIR Road, Taramani, <br></br>
              Chennai - 600 113.
            </p>
            <br></br>
            <p className=" text-xl text-blue-500">
              {" "}
              044 - 4552 2220 / 2254 <br></br>2700 +91 9677011458
            </p>
          </div>
          <div className=" text-center p-1 pr-10">
            <p className="text-2xl font-bold mb-4 shadow-inner p-1 rounded-md">
              Coimbatore
            </p>
            <p className=" text-xl">
              {" "}
              No.2A, Shringar Nagar Extn,<br></br>
              II Cross East, Bharathi Colony,<br></br>Peelamedu, <br></br>
              Coimbatore - 641 004.
            </p>
            <br></br>
            <p className=" text-xl text-blue-500">
              {" "}
              044 - 4552 2220 / 2254 <br></br>2700 +91 9677011458
            </p>
          </div>
          <div className=" text-center p-1 pr-20">
            <p className="text-2xl font-bold mb-4 shadow-inner p-1 rounded-md">
              Erode
            </p>
            <p className=" text-xl">
              2nd Floor, No 31,<br></br> Annamalai Layout,<br></br>
              Nalli Hospital Road,<br></br>Nalli Hospital Road, <br></br>Erode -
              638011.
            </p>
            <br></br>
            <p className=" text-xl text-blue-500">+91 9840284399</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
