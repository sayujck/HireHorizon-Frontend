import { useNavigate } from "react-router-dom"

const Pnf = () => {
  const navigate =useNavigate()

  return (
    <div class="flex flex-col items-center justify-center text-sm h-[400px] m-5">
      <h2 class="md:text-5xl text-3xl font-semibold text-gray-800">Page Not Found</h2>
      <p class="text-base mt-4 text-gray-500">Sorry, we couldn’t find the page.</p>
      <div class="flex items-center gap-4 mt-6">
        <button onClick={()=>navigate('/')} type="button" class="bg-purple-700 hover:bg-purple-800 px-6 py-2.5 text-white rounded active:scale-95 transition-all">
          Go back home
        </button>
      </div>
    </div>
  )
}


export default Pnf