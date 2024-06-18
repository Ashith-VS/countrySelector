import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
function App() {
  const [apiData, setApiData] = useState([]);
  const [searchValue, setSearchValue] = useState("India");
  const [searchParams, setSearchParams] = useSearchParams();

  // Get a specific query parameter
  // const myParam = searchParams.get("myParam");
  // console.log(myParam);

  

  
  useEffect(() => {
    let country = searchParams.get("country");
    // console.log(country)
    if (!country) {
      // Set default country to 'India' if query parameter is not found
      // country = "India";
      // setSearchParams({ country });
    }
    setSearchValue(country);
    fetchData(country);
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      await fetchData(searchValue);
      // Set a query parameter
      setSearchParams({ country: searchValue });
    }
  };

  const fetchData = async (country) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      handleClear();
    }
  };
  const handleClear = () => {
    setApiData([]);
    // fetchData()
  };

  const inputValues = (data, i) => {
    // if (!data) return null;
    const fields = [
      {
        label: "",
        type: "img",
        value: data?.flags?.png,
      },
      {
        label: "Capital",
        type: "string",
        value: data?.capital?.map((item) => item || null),
      },
      {
        label: "Continent",
        type: "string",
        value: data?.continents?.map((item) => item || null),
      },
      {
        label: "Population",
        type: "string",
        value: data?.population,
      },
      {
        label: "Currency",
        type: "currency",
        value1: data?.currencies?.[Object?.keys(data?.currencies)[0]]?.name,
        value2: Object?.keys(data?.currencies)[0],
      },
      {
        label: "Common Languages",
        type: "object",
        value: Object.keys(data?.languages)
          .map((key) => data?.languages[key])
          .toString(),
      },
      {
        label: "Borders",
        type: "string",
        value: data?.borders?.toString(),
      },
      {
        label: "Area",
        type: "string",
        value: data?.area,
      },
      {
        label: "Calling Are",
        type: "callingare",
        value1: data?.idd?.root,
        value2: data?.idd?.suffixes[0],
      },
      {
        label: "Capital Latitude and Longitude are",
        type: "string",
        value: data?.capitalInfo?.latlng.map((item) => item || null),
      },
      {
        label: "Timezones",
        type: "string",
        value: data.timezones.map((item) => item || null),
      },
    ];
    return (
      <ul
        className="country mb-2"
        key={i}
        style={{
          listStyleType: "none",
        }}
      >
        {fields.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "5px",
              overflowWrap: "break-comma",
              wordWrap: "break-word",
            }}
          >
            {renderFieldValue(item)}
          </li>
        ))}
      </ul>
    );
  };

  const renderFieldValue = (item) => {
    switch (item.type) {
      case "img":
        return <img src={item.value} alt="" />;
      case "string":
        return (
          <>
            <span>{item.label}: </span>
            <br />
            {item.value}
          </>
        );
      case "callingare":
        return (
          <>
            <span>{item.label}: </span>
            <br />
            {`${item.value1}${item.value2}`}
          </>
        );
      case "object":
        return (
          <>
            <span>{item.label}: </span>
            <br />
            {item.value}
          </>
        );
      case "currency":
        return (
          <>
            <span>{item.label}: </span>
            <br />
            {`${item.value1}-${item.value2}`}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ background: "#F3F5F0", overflow: "hidden" }}
    >
      <div
        className="border m-4"
        style={{
          width: "400px",
          padding: "10px",
          minHeight: "100vh",
          background: "white",
        }}
      >
        <form
          className="m-3 d-flex justify-content-center"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            className="form-control mr-2"
            placeholder="Search"
            value={searchValue}
            onChange={handleInput}
          />
          <button className="btn btn-primary">Search</button>
        </form>
        <div className="result" style={{ maxwidth: "300px" }}>
          <>
            {apiData.length === undefined ? (
              <p
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {apiData.message}
              </p>
            ) : (
              apiData?.map((data, i) => inputValues(data, i))
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
