import LatestJobs from '@/components/candidate/LatestJobs'
import CompanyLogos from '@/components/candidate/CompanyLogos'
import Footer from '../components/Footer'
import Banner from '@/components/candidate/Banner'


const Home = () => {
    return (
        <>
            <Banner/>
            <LatestJobs/>
            <CompanyLogos/>
            <Footer />
        </>
    )
}

export default Home