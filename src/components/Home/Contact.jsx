import React from 'react';
import Title from '../Title';

function Contact() {
   return (
      <>
         <br />
         <br />
         <br />
         <div className="flex flex-col mb-10 mx-auto">
            <div className="flex justify-center items-center">
               <form
                  action="https://getform.io/f/75b38b2a-7416-4bf2-91d1-06d1c136f08f"
                  method="POST"
                  className="flex flex-col w-full md:w-7/12"
               >
                  <Title className="text-zinc-500">Contact</Title>
                  <input
                     type="text"
                     name="name"
                     placeholder="Name"
                     className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
                     required
                  />
                  <input
                     type="text"
                     name="email"
                     placeholder="Email"
                     className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
                     required
                  />
                  <textarea
                     name="message"
                     placeholder="Message"
                     rows="10"
                     className="p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none"
                     required
                  />
                  <button
                     type="submit"
                     className="text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white bg-gradient-to-b from-yellow-500 via-blue-500 to-red-900 drop-shadow-md hover:text-black"
                  >
                     Contact Me
                  </button>
               </form>
            </div>
         </div>
      </>
   )
}

export default Contact;