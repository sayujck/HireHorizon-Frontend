import { useState } from 'react';
import View from '../components/candidate/View';
import { Slider } from "@/components/ui/slider";

const FindJobs = () => {

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
      <div className="p-8 rounded-lg">
        <h3 className="text-2xl font-semibold">Find Your Dream Job</h3>
        <p className="text-gray-600 mb-4">Search jobs that match your skills and experience.</p>
        <div className="flex flex-wrap items-center gap-4 p-4rounded-lg">
          <div className="flex items-center border rounded-lg px-3 py-2 w-1/4">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              onChange={handleChange}
              name="title"
              className="flex-1 bg-transparent px-2 outline-none text-gray-700"
              type="text"
              placeholder="Job Title"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 w-1/3 ">
            <i className="fa-solid fa-location-dot text-gray-500"></i>
            <input
              onChange={handleChange}
              name="location"
              className="flex-1 bg-transparent px-2 outline-none text-gray-700"
              type="text"
              placeholder="Location (City, Remote, etc.)"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 w-1/3">
            <i className="fa-solid fa-briefcase text-gray-500"></i>
            <input
              onChange={handleChange}
              name="experience"
              className="flex-1 bg-transparent px-2 outline-none text-gray-700"
              type="number"
              min="0"
              placeholder="Years of Experience"
            />
          </div>
        </div>
      </div>

      {/* filter */}
      <div className="flex justify-center gap-5">
        <div className="px-10 pt-6 md:w-1/4 sm:w-1/5">
          <div className="flex justify-between gap-5 items-center container pb-3">
            <h5 className="text-lg font-semibold">Filter</h5>
            <button onClick={() => setFilters({ minSalary: 0, maxSalary: 25, jobType: [], workMode: [] })}>
              Clear all
            </button>
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

        {/* all jobs */}
        <div className="pt-5 px-5 md:w-3/4 sm:w-4/5">
          <View searchFilters={searchFilters} filters={filters} />
        </div>
      </div>
    </>
  );
};

export default FindJobs;
