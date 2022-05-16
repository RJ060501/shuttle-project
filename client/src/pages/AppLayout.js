import {
    useState,
  } from "react";
  import {
    Routes,
    Route,
  } from "react-router-dom";
  import {
    Frame,
    withSounds,
    withStyles,
  } from "arwes";
  
  import useBookings from "../hooks/useBookings";
  
//   import Centered from "../components/Centered";
//   import Header from "../components/Header";
//   import Footer from "../components/Footer";
  
  import Book from "./Book";
//   import History from "./History";
//   import Upcoming from "./Upcoming";
  
  const styles = () => ({
    content: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      margin: "auto",
    },
    centered: {
      flex: 1,
      paddingTop: "20px",
      paddingBottom: "10px",
    },
  });
  
  const AppLayout = props => {
    const { sounds, classes } = props;
  
    const [frameVisible, setFrameVisible] = useState(true);
    const animateFrame = () => {
      setFrameVisible(false);
      setTimeout(() => {
        setFrameVisible(true);
      }, 600);
    };
  
    const onSuccessSound = () => sounds.success && sounds.success.play();
    const onAbortSound = () => sounds.abort && sounds.abort.play();
    const onFailureSound = () => sounds.warning && sounds.warning.play();
  
    const {
      bookings,
      isPendingBooking,
      submitBooking,
      abortBooking,
    } = useBookings(onSuccessSound, onAbortSound, onFailureSound);
    
    return <div className={classes.content}>
      {/* <Header onNav={animateFrame} /> */}
      {/* <Centered className={classes.centered}> */}
        <Frame animate 
          show={frameVisible} 
          corners={4} 
          style={{visibility: frameVisible ? "visible" : "hidden"}}>
          {anim => (
            <div style={{padding: "20px"}}>
            <Routes>
              <Route exact path="/">
                <Book
                  entered={anim.entered}
                  submitBooking={submitBooking}
                  isPendingBooking={isPendingBooking} />
              </Route>
              {/* <Route exact path="/launch">
                <Launch
                  entered={anim.entered}
                  submitBooking={submitBooking}
                  isPendingBooking={isPendingBooking} />
              </Route>
              <Route exact path="/upcoming">
                <Upcoming
                  entered={anim.entered}
                  bookings={bookings}
                  abortBooking={abortBooking} />
              </Route>
              <Route exact path="/history">
                <History entered={anim.entered} bookings={bookings} />
              </Route> */}
            </Routes>
            </div>
          )}
        </Frame>
      {/* </Centered> */}
      {/* <Footer /> */}
    </div>;
  };
  
  export default withSounds()(withStyles(styles)(AppLayout));