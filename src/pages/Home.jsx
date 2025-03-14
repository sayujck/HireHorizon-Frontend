import hero from '../assets/hero.png'
import google from '../assets/company/google.png'
import flipkart from '../assets/company/flipkart.png'
import ibm from '../assets/company/ibm.png'
import microsoft from '../assets/company/microsoft.png'
import youtube from '../assets/company/youtube.png'
import Footer from '../components/Footer'

import LatestJobs from '@/components/candidate/LatestJobs'


const Home = () => {

    


    return (
        <>
            {/* Hero Section */}
            <div className="heroSection pt-8 p-20 flex flex-col md:flex-row justify-between items-center">
                {/* Hero Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        Find a job that aligns with your interests and skills
                    </h1>
                    <p className="mt-4 pb-4 text-gray-600">
                        Thousands of jobs in all the leading sectors are waiting for you.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="flex items-center border rounded-lg p-2 w-full max-w-50">
                            <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Job title, Keyword..."
                                className="outline-none w-full bg-transparent"
                            />
                        </div>

                        <div className="flex items-center border rounded-lg p-2 w-full max-w-40">
                            <i className="fa-solid fa-location-dot text-gray-500 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Location"
                                className="outline-none w-full bg-transparent"
                            />
                        </div>

                        <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition mt-2 md:mt-0">
                            <i className="fa-solid fa-search mr-2"></i>Find Job
                        </button>
                    </div>
                </div>
                {/* Hero Image */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <img
                        src={hero}
                        alt="Hero"
                        className="w-full max-w-md object-cover mx-auto"
                    />
                </div>
            </div>

            {/* Latest jobs */}
            <LatestJobs/>

            {/* Company logos */}
            <>
                <p className='text-center text-2xl font-semibold mt-5 py-4'>Top companies hiring now</p>
                <div className='flex flex-wrap justify-center items-center mb-5 gap-10 gap-md-5'>
                    <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={google} alt="Google" />
                    <img className='img-fluid' style={{ width: '110px', height: 'auto' }} src={flipkart} alt="Flipkart" />
                    <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={ibm} alt="IBM" />
                    <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={microsoft} alt="Microsoft" />
                    <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={youtube} alt="YouTube" />
                </div>
            </>
            <Footer />
        </>
    )
}

export default Home