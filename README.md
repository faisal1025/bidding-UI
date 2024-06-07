## Bidding-UI

This is a assingment project UI part I have created it to test socket.io connection and web socket working.

## Step to Setup locally

- Clone the repository.
- Run `npm i` in the command line(CMD)
- Now, run `npm run dev` to run the server


## Working of Project

- Click on `Make a Bid` , now a form open to you. You connected to the web socket connection with the backend.
- Run the backend server [api](https://github.com/faisal1025/bidding-API) go to postman generate the new JWT token (token will expires after 10h)
- Come inside the frontend code `bid` folder `page.tsx` and in the `token` variable put the generated token.
- Now, make a bid enter any amount eg. 8000.00 no creating the bid a Web Socket is connected and a message notfied to all clients.


Link to backend Click [Here](https://github.com/faisal1025/bidding-API)

