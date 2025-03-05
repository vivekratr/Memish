// import React from 'react'

const CreateButton = () => {
  return (
    <div className="w-[80%]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 mx-auto flex items-center gap-4 justify-center relative rounded-lg bg-white border-gray border-[1px] border-solid box-border h-[3.5rem] overflow-hidden text-left text-[1.25rem] text-black font-inter">
      <div className="tracking-[-0.04em] font-semibold [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]">
        Start Creating
      </div>
      <img
        className=" w-[1.5rem] h-[1.5rem] object-cover"
        alt=""
        loading='lazy'
        src="https://i.imgur.com/cDkGUGV.png"
      />
    </div>
  );
}

export default CreateButton
