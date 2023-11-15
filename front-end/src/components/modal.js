import React, { useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResultGrid from './result';

function Modal({ isOpen, onClose, content }) {
  let kisa = false;
  let vt_data = false;
  let vt_links = false;
  let vt_meta = false;
  console.log(content)
  if(content.d_data)
    if(content.d_data.kisa_data.response)
      if(content.d_data.kisa_data.response.result.result_code != "031")
          kisa = content.d_data.kisa_data.response.whois;
  if(content.d_data)
    if(content.d_data.vt_data.data)
    {
      vt_data = content.d_data.vt_data.data;
      vt_links = content.d_data.vt_data.data.links;
      vt_meta = content.d_data.vt_data.meta;
    }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Paper elevation = {0} style={{ padding: '0px', margin: '0 auto', border: '1px solid #E0E0E0', marginBottom: '1vh' }}>
      <Typography variant='h6' style={{ textAlign: 'center' }} fontWeight='bold'>ID#{content.d_id}</Typography>
      <Typography variant='h5' style={{ textAlign: 'center', marginTop: '-1vh', marginBottom: '1vh' }}>{content.d_url}</Typography>
      {vt_data &&
      <Typography variant='h5' color='#5587E7' style={{ textAlign: 'center', marginTop: '-1vh', marginBottom: '1vh' }}>malicious {vt_data.attributes.stats.malicious}</Typography>}
      {kisa && 
      <Accordion elevation={0} sx={{}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' fontWeight='bold'>WHOIS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                addr
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.addr}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                email
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.adminEmail}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                admin
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.adminName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                phone
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.adminPhone}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                agency
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.agency_url}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                dnssec
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.dnssec}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                e addr
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.e_addr}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                e name
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.e_adminName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                e agency
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.e_agency}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                e regName
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.e_regName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                endData
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.endDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                lastUpdate
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.lastUpdatedDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                name
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                post
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.post}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                regDate
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.regDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                regName
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {kisa.krdomain.regName}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      }
      <Accordion elevation={0} sx={{}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' fontWeight='bold'>VIRUS TOTAL</Typography>
        </AccordionSummary>
        <AccordionDetails>
      <Accordion elevation={0} sx={{}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' fontWeight='bold'>Attributes</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {vt_data &&
        <>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                date
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {vt_data.attributes.date}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                stats
              </Typography>
            </Grid>
            <Grid item xs>
            <Grid container>
              <Grid item xs>
                <Typography>
                  harmless {vt_data.attributes.stats.harmless}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography>
                  malicious {vt_data.attributes.stats.malicious}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography>
                  suspicious {vt_data.attributes.stats.suspicious}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography>
                  timeout {vt_data.attributes.stats.timeout}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography>
                  undetected {vt_data.attributes.stats.undetected}
                </Typography>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography fontWeight='bold'>
                status
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                {vt_data.attributes.status}
              </Typography>
            </Grid>
          </Grid>
        </>
        }
        </AccordionDetails>
        </Accordion>
        {vt_links &&
          <Accordion elevation={0} sx={{}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant='h6' fontWeight='bold'>links</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={2}>
                  <Typography fontWeight='bold'>
                    item
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    {vt_links.item.substring(0,30)}...
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography fontWeight='bold'>
                    self
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    {vt_links.self.substring(0,30)}...
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
        {vt_meta &&
          <Accordion elevation={0} sx={{}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant='h6' fontWeight='bold'>Meta</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={2}>
                  <Typography fontWeight='bold'>
                    id
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    {vt_meta.url_info.id}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography fontWeight='bold'>
                    url
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    {vt_meta.url_info.url}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
        </AccordionDetails>
      </Accordion>
    </Paper>

      <Button onClick={onClose} color="primary">
        닫기
      </Button>
    </Dialog>
  );
}

export default Modal;
