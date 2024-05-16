import { Fragment, useEffect } from "react";
import ContactItem from "../contact-item/ContactItem";
import { Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredList, setList } from "../../store/slices/contactSlice";
import { getAllContacts } from "../../services/ContactService";

// TODO: Infinite Scrolling
// const PAGE_SIZE = 12;

const ContactList = () => {
  // General hooks
  const dispatch = useDispatch();

  // TODO: Infinite Scrolling
  // const [index, setIndex] = useState(0);

  // Selectors
  const filteredList = useSelector(selectFilteredList);

  // TODO: Infinite Scrolling
  // const fetchData = () => {
  //   setTimeout(() => {
  //     setIndex(index + 1);
  //   }, 1000);
  // };

  // TODO: Infinite Scrolling
  // useEffect(() => {
  //   const newItems = contacts.slice(index * PAGE_SIZE, PAGE_SIZE * (index + 1));

  //   if (index < 1) {
  //     setItems(newItems);
  //   } else {
  //     setItems([...items, ...newItems]);
  //   }
  // }, [index]);

  // Effects
  useEffect(() => {
    getAllContacts()
      .then((response) => {
        dispatch(setList(response.data));
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupByLetter = filteredList.reduce((acc, curr) => {
    const letter = curr.firstName[0];
    if (!acc[letter]) {
      acc[letter] = [];
    }

    acc[letter].push(curr);
    return acc;
  }, {});
  //TODO: Infinite Scrolling
  // const hasMore = index < Math.ceil(contacts.length / PAGE_SIZE);
  return (
    <Stack
      id="scrollableDiv"
      sx={{
        height: "calc(100vh - 250px)",
        overflow: "auto",
      }}
      rowGap={1}
    >
      {/* TODO: Infinite Scrolling */}
      {/* {contacts.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          style={{ display: "flex", flexDirection: "column" }}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <Stack rowGap={1}>
            {items.map((contact, index) => (
              <ContactItem key={index} contact={contact} />
            ))}
          </Stack>
        </InfiniteScroll>
      ) : (
        <Typography textAlign="center" variant="body1">
          No contacts
        </Typography>
      )} */}
      {Object.keys(groupByLetter).map((key) => {
        const letter = key;
        const contacts = groupByLetter[key];

        return (
          <Fragment key={letter}>
            <Grid container columnGap={2}>
              <Grid item>
                <Typography sx={{ marginTop: "14px" }}>{letter}</Typography>
              </Grid>
              <Grid item xs>
                <Stack rowGap={2}>
                  {contacts.map((contact, index) => (
                    <ContactItem key={index} contact={contact} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default ContactList;
