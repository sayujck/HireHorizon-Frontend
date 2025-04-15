import { useState } from 'react';
import View from '../components/candidate/View';
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from '@/hooks/use-mobile';

const FindJobs = () => {


  const [showModal, setShowModal] = useState(false);
  const [searchFilters, setSearchFilter] = useState({
    title: '',
    location: '',
    experience: ''
  });
  const [filters, setFilters] = useState({
    minSalary: 0,
    maxSalary: 25,
    jobType: [],
    workMode: []
  });

  const handleChange = (e) => {
    setSearchFilter({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, type) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => {
      let updatedValues = checked
        ? [...prevFilters[type], id]
        : prevFilters[type].filter((item) => item !== id);
      return { ...prevFilters, [type]: updatedValues };
    });
  };

  const handleSalaryChange = (newRange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minSalary: newRange[0],
      maxSalary: newRange[1],
    }));
  };

  return (
    <>
      {/* search */}
      <div className="jobs px-12 py-5 rounded-lg">
        <h3 className="text-2xl text-center md:text-left font-semibold">Find Your Dream Job</h3>
        <p className="text-gray-600 mb-4 text-center md:text-left">Search jobs that match your skills and experience.</p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:justify-start py-2">
          <div className="flex items-center border rounded-lg px-3 py-2 w-30 md:w-1/4">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              onChange={handleChange}
              name="title"
              className="w-full bg-transparent px-2 outline-none text-gray-700"
              type="text"
              placeholder="Job Title"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 w-30 md:w-1/4">
            <i className="fa-solid fa-location-dot text-gray-500"></i>
            <input
              onChange={handleChange}
              name="location"
              className="w-full bg-transparent px-2 outline-none text-gray-700"
              type="text"
              placeholder="Location"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 w-30 md:w-1/4">
            <i className="fa-solid fa-briefcase text-gray-500"></i>
            <input
              onChange={handleChange}
              name="experience"
              className="w-full bg-transparent px-2 outline-none text-gray-700"
              type="number"
              min="0"
              placeholder={useIsMobile ? "Experience" : "Years of Experience"}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">

        {/* filter */}
        <div className="hidden md:block px-3 pt-6 min-w-60">
          <div className="flex justify-between gap-5 items-center container pb-3">
            <h5 className="text-xl font-semibold">Filter</h5>
            <button className='text-blue-900' onClick={() => setFilters({ minSalary: 0, maxSalary: 25, jobType: [], workMode: [] })}>clear</button>
          </div>

          <div className='flex flex-col'>
            <div className="container">
              <h6 className="text-md font-medium pb-2">Salary Range</h6>
              <div className="flex justify-between my-2 text-sm">
                <span className="text-gray-500">Min: {filters.minSalary.toLocaleString()} LPA</span>
                <span className="text-gray-500">Max: {filters.maxSalary.toLocaleString()} LPA</span>
              </div>
              <Slider
                defaultValue={[filters.minSalary, filters.maxSalary]}
                min={0}
                max={25}
                step={1}
                onValueChange={handleSalaryChange}
              />
            </div>

            <hr className="my-4" />

            <div className="container">
              <h6 className="text-md font-medium">Job Type</h6>
              <div className="mt-2 space-y-2">
                {["Full Time", "Part Time"].map((type) => (
                  <div key={type}>
                    <input type="checkbox" id={type} checked={filters.jobType.includes(type)} onChange={(e) => handleCheckboxChange(e, 'jobType')} className="mr-2" />
                    <label htmlFor={type} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            <div className="container">
              <h6 className="text-md font-medium">Work Mode</h6>
              <div className="mt-2 space-y-2">
                {["On-Site", "Remote", "Hybrid"].map((mode) => (
                  <div key={mode}>
                    <input type="checkbox" id={mode} checked={filters.workMode.includes(mode)} onChange={(e) => handleCheckboxChange(e, 'workMode')} className="mr-2" />
                    <label htmlFor={mode} className="text-sm">{mode}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* filter modal mobile */}
        <div>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50">
              <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-5 right-5 text-xl font-bold" onClick={() => setShowModal(false)}>x</button>
                <div className="flex justify-between items-center pb-3">
                  <h5 className="text-xl font-semibold">Filter</h5>

                </div>
                <div className="flex flex-col mt-4">
                  {/* Salary Filter */}
                  <div>
                    <h6 className="text-md font-medium pb-2">Salary Range</h6>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Min: {filters.minSalary} LPA</span>
                      <span>Max: {filters.maxSalary} LPA</span>
                    </div>
                    <Slider
                      defaultValue={[filters.minSalary, filters.maxSalary]}
                      min={0}
                      max={25}
                      step={1}
                      onValueChange={handleSalaryChange}
                    />
                  </div>

                  <hr className="my-4" />

                  {/* Job Type */}
                  <div>
                    <h6 className="text-md font-medium">Job Type</h6>
                    <div className="mt-2 space-y-2">
                      {["Full Time", "Part Time"].map((type) => (
                        <div key={type}>
                          <input
                            type="checkbox"
                            id={type}
                            checked={filters.jobType.includes(type)}
                            onChange={(e) => handleCheckboxChange(e, "jobType")}
                            className="mr-2"
                          />
                          <label htmlFor={type} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Work Mode */}
                  <div>
                    <h6 className="text-md font-medium">Work Mode</h6>
                    <div className="mt-2 space-y-2">
                      {["On-Site", "Remote", "Hybrid"].map((mode) => (
                        <div key={mode}>
                          <input
                            type="checkbox"
                            id={mode}
                            checked={filters.workMode.includes(mode)}
                            onChange={(e) => handleCheckboxChange(e, "workMode")}
                            className="mr-2"
                          />
                          <label htmlFor={mode} className="text-sm">
                            {mode}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
                <div className='mt-5 text-end'>
                  <button className="text-sm bg-purple-800 text-white px-3 py-2 rounded-lg" onClick={() => setFilters({ minSalary: 0, maxSalary: 25, jobType: [], workMode: [] })}>Clear all</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* all jobs */}
        <div className="pt-5 px-3 md:w-3/4">
          <div className="container">
            <div className='flex justify-between'>
              <h5 className='px-2 text-2xl font-semibold mb-4'>All Jobs</h5>
              <div>
                <button className="bg-purple-800 text-white px-3 py-1 rounded-md md:hidden" onClick={() => setShowModal(true)}>Filter</button>
              </div>
            </div>
            <View searchFilters={searchFilters} filters={filters} />
          </div>
        </div>



      </div>

    </>
  );
};

export default FindJobs;
