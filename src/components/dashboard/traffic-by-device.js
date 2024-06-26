import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';

export const TrafficByDevice = (props) => {
  const theme = useTheme();
  const data = {
    datasets: [
      {
        data: props.data ? props.data  : [],
        backgroundColor: ['#3F51B5','#3D3635', '#e53935', '#FB8C00','#006A4E','#FFA600','#F75D59','#5865F2',],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      },
    ],
    labels: props.label ? props.label : []
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  

  return (
    <Card {...props}>
      <CardHeader title="Today Rented" />
      <Divider />
      <CardContent>
        {/* <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box> */}
        <TableContainer sx={{ mt: 2, overflow: 'scroll' }}>
          <Table >
            <TableHead>
              <TableRow>
                {
                  props && props.label.map((item, ind) => (
                    <TableCell align='center' key={ind}>
                      <Typography variant='subtitle2' noWrap>{item}</Typography>
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {
                  props && props.data.map((item, ind) => (
                    <TableCell align='center' key={ind}>
                      <Typography variant='h6' noWrap>{item}</Typography>
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
