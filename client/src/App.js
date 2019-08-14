import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([
    {
      _id: "5d533ba5552a03608c362cd4",
      title: "GrowthCub.com",
      description:
        "The ONLY starter site on Flippa with proof of 5+ other buyers getting amazing results with the same type of business. 100% proven to work and proven to generate $5k or even $10k/mo. Watch a video now!",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_0cfa408b-db0e-45ec-8495-dc701e32bfc0.png",
      price: 998,
      url: "http://GrowthCub.com/"
    },
    {
      _id: "5d533ba5552a03608c362cd8",
      title: "FlightsMatch.com",
      description:
        "Start profiting in one of the largest online markets with this professionally designed travel price comparison website. The site compares prices from all major travel providers to find the best deals.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_3cf466c4-6e25-480c-b194-ba88ce3bcbc4.png",
      price: 197,
      url: "http://FlightsMatch.com/"
    },
    {
      _id: "5d533ba5552a03608c362cda",
      title: "erpinnews.com",
      description:
        "ERPINNEWS is a Tech News powered Channel (online+events)-9k organic Twitter followers, 15k unique  website visitors and a high Alexa ranking. Current customers 50+ SMEs",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_afe98ea2-5c54-4dd9-9203-3656169c92a0.png",
      price: null,
      url: "http://erpinnews.com/"
    },
    {
      _id: "5d533ba5552a03608c362cdf",
      title: "yogasworld.com",
      description:
        "Fully Automated Dropshipping Store - Built on Shopify, the Worlds Best Ecommerce Platform 100s of Hot Selling Yoga Products added, Huge Niche, Anybody Can Do From Anywhere In World",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_ef3361bf-64a2-4984-9919-f3e4cf8a0fa9.png",
      price: 189,
      url: "https://yogasworld.com/"
    },
    {
      _id: "5d533ba5552a03608c362ce0",
      title: "clothingprime.com",
      description:
        "ClothingPrime.com is a Premium Shopify Clothes/Fashion Store. Fully Automated! Winning products with a profit mark-up of 30-120%. $500/week profit Potential. Reliable Supplier. Fast Shipping.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_6736c704-48c9-4e6c-80bb-d4999932e930.png",
      price: null,
      url: "http://clothingprime.com/"
    },
    {
      _id: "5d533ba5552a03608c362ce4",
      title: "arcticmagazine.net",
      description:
        "Monetize 3 different ways - Original Articles - Instagram Included",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_85a873a0-d515-4877-84fb-bce15e6913a2.png",
      price: 2495,
      url: "http://arcticmagazine.net/"
    },
    {
      _id: "5d533ba5552a03608c362ceb",
      title: "mediasale.co",
      description:
        "Publish articles for your customers on over 500 media outlets - CHECK SAMPLE BELOW",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_9ae09f6c-cce3-44b5-82c9-3695755b36d0.png",
      price: 975,
      url: "http://mediasale.co/"
    },
    {
      _id: "5d533ba5552a03608c362ced",
      title: "livecryptoexchange.com",
      description:
        "This website  is a crypto exchange platform where your visitors can exchange:\nBTC <=>  ALT coins , iTunes,Amazon, Bank Transfer,PayPal, Skrill,PM , ERC20 tokens\nDomain valued at $1,128 by GoDaddy",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_9cf6e0ac-db0d-4543-bc14-3ca29d593b02.png",
      price: 1200,
      url: "https://www.livecryptoexchange.com/"
    },
    {
      _id: "5d533ba5552a03608c362cee",
      title: "shopthara.com",
      description:
        "This store will come with over $300,000.00 of collected facebook ad data! This beautifully designed niche store has grossed over half a million dollars in a 5-month span with very generous profits!",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_d59f3bef-285d-4017-8816-28da0c546149.png",
      price: 10500,
      url: "http://shopthara.com/"
    },
    {
      _id: "5d5450811c1fbb588c35ee51",
      title: "buyselltradephone.com",
      description:
        "I will give you everything I used to grow my business to 7-figure annually. Tutorials, websites, and software to start buying phones off classified sites and reselling them on eBay.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_d5f260e4-3090-4992-a24c-563644e9b76c.png",
      price: null,
      url: "http://buyselltradephone.com/"
    },
    {
      _id: "5d5450811c1fbb588c35ee59",
      title: "FinancialConnecting.com",
      description:
        "Premium designed website about Finances, Investing, Taxes, Earning and Investment. Fully automated. No experience needed. Runs 100% on autopilot, new articles & videos are being added every few hours.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_7e34bfbf-9602-40cc-953a-e7204571d913.png",
      price: 119,
      url: "http://FinancialConnecting.com/"
    },
    {
      _id: "5d5450811c1fbb588c35ee5a",
      title: "CraftsThrill.com",
      description:
        "Do-it-yourself projects and craft ideas Website. Fully automated. No experience needed. Runs 100% on autopilot, new videos are being added every few hours.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_ecb4101f-abb4-43a1-9d1e-40969c3dda61.png",
      price: 119,
      url: "http://CraftsThrill.com/"
    },
    {
      _id: "5d5450811c1fbb588c35ee5c",
      title: "ParentingEyes.com",
      description:
        "Premium designed website about Pregnancy, Parenting, Children's Health, Tips and more. Fully automated. No experience needed. Runs 100% on autopilot, new articles are being added every few hours.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_e4680a86-bd14-4692-805e-2a5be8999666.png",
      price: 119,
      url: "http://ParentingEyes.com/"
    },
    {
      _id: "5d5450811c1fbb588c35ee5d",
      title: "nitroranking.co",
      description:
        "Established SEO Service Reseller Business for sale(Over $2692/m average profit)",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_b1c1cc05-e1c0-4e57-b73f-2beed7e53796.png",
      price: 2500,
      url: "http://nitroranking.co/"
    },
    {
      _id: "5d5450811c1fbb588c35ee67",
      title: "SportHotspot.com",
      description:
        "Premium designed website with articles related to all kind of sports news. Fully automated. No experience needed. Runs 100% on autopilot, new articles are being added every few hours. Earn on ads.",
      image:
        "https://d2jafhvbn4akdi.cloudfront.net/thumbnail_0aeb866b-820c-410e-ac24-38690cf7586b.png",
      price: 119,
      url: "http://SportHotspot.com/"
    }
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [currentElement, setCurrentElement] = useState({});

  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  //OnLoad
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    axios
      .get("/data")
      .then(response => response.data)
      .then(data => {
        setData(data);
      });

    // axios.get("/newData");
  };

  //Sumbit data using add button
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("Submitting Data");

    axios
      .get("/data", {
        title: title,
        description: description,
        image: imageURL
      })
      .then(data => console.log("Response recieved from server"));

    loadItems();
  };

  //Modal opened onclick
  const handleHide = () => setShow(false);
  const handleShow = data => {
    setShow(true);
    setCurrentElement({
      title: data.title,
      description: data.description,
      image: data.image,
      price: data.price,
      url: data.url
    });
    console.log(data);
  };

  //Add item modal open
  const handleAddHide = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />

      <div className="header">
        <h1 className="title">ReStartup</h1>
        {/* <button
          variant="btm-primary"
          className="addButton"
          onClick={() => handleAddShow()}
        >
          Add Company
        </button> */}
      </div>
      <div className="subHeading">A place where you can buy startups.</div>
      {/* Add option */}

      {/* Model starts here */}
      <Modal show={show} onHide={handleHide}>
        <Modal.Header className="modalHeader">
          <Modal.Title className="modalHeaderText">
            {currentElement.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <img src={currentElement.image} width="144px" height="144px" />
          <div>
            {currentElement.description}
            {console.log(myData)}
            <div className="viewSite">
              <Button
                variant="success"
                target="/blank"
                href={currentElement.url}
              >
                View Site
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalHeader">
          <Button variant="light" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Model starts here */}
      <Modal show={showAddModal} onHide={handleAddHide}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              Name:
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              Description:
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              Image URL:
              <input
                type="url"
                value={imageURL}
                onChange={e => setImageURL(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              value="submit"
              variant="secondary"
              onClick={handleHide}
            >
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Individual containers */}
      <div className="container">
        {myData.map(item => (
          <div
            key={item._id}
            className="project"
            value={item}
            onClick={() => {
              handleShow(item);
            }}
          >
            <img src={item.image} className="image" alt="" />
            <p className="subTitle">{item.title}</p>
            <p className="price">
              {item.price !== null ? `USD $${item.price}` : "Please Contact"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
