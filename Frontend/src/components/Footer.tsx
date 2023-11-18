const Footer = () => {
  return (
    <footer className="bg-slate-800 pb-8 pt-16 mt-[5%]  border-gray-200 text-white">
      <div className="container mx-auto flex flex-col items-center gap-[30px]">
        <div className="lg:grid lg:grid-cols-3 mb-4 text-center gap-[20%]">
          <div>
            <h4 className="text-2xl font-semibold mb-2 hover:underline cursor-pointer ">
              About Us
            </h4>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-2">Contact Us</h4>
            <br />
            <p>Email:</p>
            <p>info@example.com</p>
            <p>Phone:</p>
            <p>1203-456-7890</p>
            <div className="flex justify-center my-[10%] gap-[10%]">
              <img src="/icons/facebook.png" alt="" />
              <img src="/icons/instagram.png" alt="" />
              <img src="/icons/twitter.png" alt="" />
              <img src="/icons/linkedin.png" alt="" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-2">Locations</h4>
            <br />
            <p>Auckland</p>
            <p className="pb-[5%]">+0123456789</p>
            <p>Wellington</p>
            <p className="pb-[5%]">+0123456789</p>
            <p>Christchurch</p>
            <p className="pb-[5%]">+0123456789</p>
          </div>
        </div>
        <div className="text-center text-sm">
          <p className=""> © 2023 Tailored Tails. All rights reserved.</p>
          <p className="">Created by Kadin V & Paul T</p>
          <p className="text-xs">Images from FreekPik, Unsplash & Imagine</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
