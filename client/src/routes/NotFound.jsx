const NotFound = () => {
  throw new Response("", {
    status: 404,
    statusText: "Not Found",
  });
};

export default NotFound;
