import React, { useState, useEffect } from "react";

const TopFilterBar = (props) => {
  const [priceFilter, setPriceFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');

  const clearFilters = () => {
    setPriceFilter('');
    setAreaFilter('');
    props.setFilteredLandData(props.landData);
  };

  const applyFilters = () => {
    let filteredData = [...props.landData];

    if (priceFilter !== '') {
      filteredData = filteredData.filter(land => land.price <= parseInt(priceFilter));
    }

    if (areaFilter !== '') {
      filteredData = filteredData.filter(land => land.area.toLowerCase().includes(areaFilter.toLowerCase()));
    }

    props.setFilteredLandData(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [priceFilter, areaFilter]);

  return (
    <>
      <div className="row d-flex justify-content-center"> 
        <div className="col-3 d-flex justify-content-center"  >
          <div className="mb-2">
            <label htmlFor="areaFilter" className="form-label my-2" style={{ fontWeight: 600, color: "#2F4F4F" }}>Filter by Area:</label>
            <input
              type="text"
              className="form-control"
              id="areaFilter"
              value={areaFilter}
              style={{ borderColor: '#98FB98', borderWidth: '2px' }}
              onChange={(e) => setAreaFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col-3 d-flex flex-column align-items-center">
          <div className="mb-3">
            <label htmlFor="priceFilter" className="form-label my-2" style={{ fontWeight: 600, color: "#2F4F4F" }}>Filter by Less Than Price:</label>
            <input
              type="number"
              className="form-control"
              id="priceFilter"
              value={priceFilter}
              style={{ borderColor: '#98FB98', borderWidth: '2px' }}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary mb-2" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
    </>
  );
};

export default TopFilterBar;
