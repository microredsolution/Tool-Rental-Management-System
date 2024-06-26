import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getInitials } from "../../utils/get-initials";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

import { Card, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import requestPost, { baseUrl } from "../../../serviceWorker";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Router from "next/router";
import AlertDialog from "../active-inactive/active-inactive-list-results";

export default function GetCustomerProfile(details) {
  const [alertOpen, setAlertOpen] = useState(false)

  const onclose = () => {
    details.onClose();
  };

  const [data, setData] = useState({});
  useEffect(() => {
    let req = {
      type: "SP_CALL",
      requestId: 1100009,
      request: {
        cId: details.cId,
      },
    };
    requestPost(req).then((res) => {
      if (res.errorcode === 3) {
        Router.push({
          pathname: "/",
          query: { redirect: "1" },
        });
      } else {
        if (res.errorcode == 0) {
        } else {
          if (!res.result) {
            setData({});
          } else {

            setData(res.result);
          }
        }
      }
    });
  }, [details.open]);

  const deleteCustomer = () => {
    let req = {
      "type": "SP_CALL",
      "requestId": 1100003,
      request: {
        "cId": details.cId
      }
    }
    requestPost(req).then((res) => {
      if (res.errorCode === 3) {
        Router
          .push(

            {
              pathname: '/',
              query: { redirect: '1' },
            })
      } else if (res.errorcode == 0) {


      } else {
        Router.back()
        onclose();

      }

    })
  }
  const deleteConfirm = () => {
    setAlertOpen(true)
  }
console.log(details);
  return (
    <div>
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} deleteCustomer={deleteCustomer} cName={data.cName} />
      <Dialog open={details.open} onClose={onclose} fullWidth={true} maxWidth={"sm"}>
        <Stack direction={"row"} justifyContent={"space-between"}></Stack>
        <DialogTitle>
          <Stack direction={"row"} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            Customer Profile
            {details.isDelete && <Button sx={{ color: 'red' }} onClick={deleteConfirm}>Delete</Button>}
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} pl={3} pt={1}>
            <Grid item xs={12} align={"center"}>
              {data.proof ? (
                <Avatar
                  sx={{ bgcolor: deepOrange[500], width: 130, height: 130 }}
                  src={`${baseUrl}tools/src/uploads/images/${data.proof}`}
                />
              ) : (
                <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>
                  {" "}
                  {data.cName ? getInitials(data.cName) : getInitials("Customer")}
                </Avatar>
              )}
              <Typography variant="h5">{data.cName}</Typography>
            </Grid>

            <Grid item xs={12}>

              <Card sx={{ backgroundColor: "#F9FAFC" }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="h6">Mobile Number</Typography>
                  <Typography> {data.mobile}</Typography>
                </Stack>
                <Divider />
                {data.altermobile &&
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h6">Alternative Number</Typography>
                    <Typography> {data.altermobile}</Typography>
                  </Stack>
                }

                {
                  data.address &&
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h6">Address</Typography>
                    <Typography> {data.address}</Typography>
                  </Stack>
                }
              </Card>

              {/* //careof */}
              <Card sx={{ backgroundColor: "#F9FAFC" }}>

                {
                  data.coName &&

                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h6">C/O Name</Typography>
                    <Typography> {data.coName}</Typography>
                  </Stack>

                }


                <Divider />

                {
                  data.coMobile &&

                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h6">C/O Mobile</Typography>
                    <Typography> {data.coMobile}</Typography>
                  </Stack>

                }
              </Card>
            </Grid>
            {/* proof */}
            <Grid item ALIGN={"center"} direction={"row"}>

              <Typography variant="h6">Documents</Typography>

              {
                data.documents &&
                data.documents.map((doc) => {
                  return (
                    <a
                      href={"https://aonerentals.in/tools/src/uploads/" + doc.file}
                      rel="noreferrer noopener"
                      target="_blank"
                      key={doc}>
                      <img
                        width={250}
                        height={200}
                        style={{ objectFit: "contain" }}
                        src={"https://aonerentals.in/tools/src/uploads/" + doc.file}

                      ></img>
                    </a>
                  )
                })
              }
            </Grid>
          </Grid>
          {/* {data.map((item) => {
            return (
              <>
                <Divider orientation="horizontal" flexItem />
                <Grid
                  container
                  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                  pl={3}
                  pt={1}


                >
                  <Grid item xs={3}>
                    <Typography >{item.date}</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography >{item.item}</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography >₹{item.rate}</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography >qty:{item.qty}</Typography>
                  </Grid>

                </Grid>
              </>)

          })} */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
