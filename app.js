const express = require('express');
const axios = require('axios');
const fs = require('fs');
const mustache = require('mustache');

const app = express();
const port = 3000;

// Define the API endpoint
app.get('/template', (req, res) => {
    // Step 1: Fetch data from the first API
    const apiURL = 'https://table-data.onrender.com/scrape';

    axios.get(apiURL)
        .then(response => {
            let jobListings = response.data.slice(1);
            jobListings = jobListings.filter(job => {
                return job[0] !== '104845' && job[0] !== '108262';
            })

            // Array to store job details
            const allJobs = [];

            // Step 2: Process each job listing
            Promise.all(jobListings.map(job => {
                const jobId = job[0];
                const jobAPIURL = `https://table-data.onrender.com/scrape?id=${jobId}`;

                // Fetch job details
                return axios.get(jobAPIURL)
                    .then(jobResponse => {
                        const jobData = jobResponse.data;
                        // Extract relevant information
                        const location = jobData[0];
                        const state = jobData[1];
                        const imageUrl = jobData[2];
                        const jobDescription = jobData[3];
                        const jobType = jobData[4];

                        // Push job details to the array
                        allJobs.push({
                            jobId,
                            location,
                            state,
                            imageUrl,
                            jobDescription,
                            jobType
                        });
                    })
                    .catch(error => {
                        console.error(`Error fetching job details for job ID ${jobId}: ${error.message}`);
                    });
            }))
                .then(() => {
                    // Print or use the array of all jobs as needed
                    console.log(allJobs);

                    // Your existing template code
                    const template = `
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
            <!--<![endif]-->
            <title>VetRelief.com - Sponsored Permanent Jobs</title>
            <!--[if gte mso 9]>
            <style type="text/css" media="all">
                sup { font-size: 100% !important; }
            </style>
            <![endif]-->
            
        
            <style type="text/css" media="screen">
                /* Linked Styles */
                body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
                a { color:#66c7ff; text-decoration:none }
                p { padding:0 !important; margin:0 !important } 
                img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                .mcnPreviewText { display: none !important; }
        
                        
                /* Mobile styles */
                @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                    .mobile-shell { width: 100% !important; min-width: 100% !important; }
                    .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
                    
                    .text-header,
                    .m-center { text-align: center !important; }
                    
                    .center { margin: 0 auto !important; }
                    .container { padding: 0px 10px 10px 10px !important }
                    
                    .td { width: 100% !important; min-width: 100% !important; }
        
                    .text-nav { line-height: 28px !important; }
                    .p30 { padding: 15px !important; }
        
                    .m-br-15 { height: 15px !important; }
                    .p30-15 { padding: 30px 15px !important; }
                    .p40 { padding: 20px !important; }
        
                    .m-td,
                    .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
        
                    .m-block { display: block !important; }
        
                    .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
        
                    .column,
                    .column-top,
                    .column-empty,
                    .column-empty2,
                    .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
                    .column-empty { padding-bottom: 10px !important; }
                    .column-empty2 { padding-bottom: 20px !important; }
                    .content-spacing { width: 15px !important; }
                }
            </style>
        </head>
        <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                <tr>
                    <td align="center" valign="top">
                        <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                            <tr>
                                <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:0px 0px 40px 0px;">
                                    <!-- Header -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15" style="padding: 50px 0px 40px 0px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:center;"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667639/email/foplp9kbclx4oye5q0uc.png" width="200" height="58" border="0" alt="" /></td>
                                                                </tr>
                                                            </table>
                                                        </th>
                                                        <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
        
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Header -->
        
                                    <!-- Nav -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15" style="padding: 25px 30px;" bgcolor="#3267af" align="center">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="text-nav" style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; text-align:center; text-transform:uppercase; font-weight:bold;">
                                                            <a href="https://vetrelief.com/pinfo.phtml" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">How it works</span></a>
                                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                                            <a href="https://vetrelief.com/search.phtml" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Search a Job</span></a>
                                                            <span class="m-block"><span class="m-hide">&nbsp; &nbsp; &nbsp; &nbsp;</span></span>
                                                            <a href="https://vetrelief.com/specialists.phtml" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Mobile Specialist</span></a>
                                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                                            <a href="https://vetrelief.com/faq.phtml" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">FAQ</span></a>
                                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                                            <a href="https://vetrelief.com/login_form.phtml" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Login</span></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Nav -->
        
                                    <!-- Hero -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667639/email/aq5uxyzf9aa9a2tldckv.jpg" width="650" height="400" border="0" alt="" /></td>
                                        </tr>
                                    </table>
                                    <!-- END Hero -->
        
                                    <!-- Article Image On The Left -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="padding-bottom: 10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <th class="column" width="240" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[0].imageUrl}" width="320" height="250" border="0" alt="" /></td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                    <th class="column-empty" width="50" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                                    <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="h2 pb20" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:34px; text-align:left; padding-bottom:20px;">${allJobs[0].jobType}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="text pb20" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:20px;">${allJobs[0].jobDescription.substring(0, 120)}...</td>
                                                                            </tr>
                                                                            <!-- Button -->
                                                                            <tr>
                                                                                <td align="left">
                                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[0].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <!-- END Button -->
                                                                        </table>
                                                                    </th>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Article Image On The Left -->
                                    
                                    <!-- Two Columns -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="pb10" style="padding-bottom:10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <!-- Section Title -->
                                                    <tr>
                                                        <td style="padding-bottom: 10px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td style="padding: 20px 15px;" bgcolor="#3267af" align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="section-title" style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:22px; text-align:center; font-weight:bold; text-transform:uppercase;">This week&rsquo;s Featured Permanent Jobs</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- END Section Title -->
                                                    <!-- Columns -->
                                                    <tr>
                                                        <td>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <th class="column-top" width="320" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[1].imageUrl}" width="320" height="238" border="0" alt="" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="p30" style="padding:30px;">
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="h3 pb25" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[1].jobType}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[1].jobDescription.substring(1,120)}...</td>
                                                                                        </tr>
                                                                                        <!-- Button -->
                                                                                        <tr>
                                                                                            <td align="left">
                                                                                                <table border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[1].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <!-- END Button -->
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                    <th class="column-top" width="320" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[2].imageUrl}" width="320" height="238" border="0" alt="" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="p30" style="padding:30px;">
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="h3 pb25" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[2].jobType}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[2].jobDescription.substring(1,120)}...</td>
                                                                                        </tr>
                                                                                        <!-- Button -->
                                                                                        <tr>
                                                                                            <td align="left">
                                                                                                <table border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[2].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <!-- END Button -->
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- END Columns -->
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Two Columns -->
        
                                    <!-- Three Columns -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="pb10" style="padding-bottom:10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <!-- Section Title -->
                                                    <tr>
                                                        <td style="padding-bottom: 10px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td style="padding: 20px 15px;" bgcolor="#3267af" align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="section-title" style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:22px; text-align:center; font-weight:bold; text-transform:uppercase;">More Featured Jobs</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- END Section Title -->
                                                    <!-- Columns -->
                                                    <tr>
                                                        <td style="padding-bottom: 10px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[3].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="p30" style="padding:30px;">
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[3].jobType}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[3].jobDescription.substring(1,120)}...</td>
                                                                                        </tr>
                                                                                        <!-- Button -->
                                                                                        <tr>
                                                                                            <td align="left">
                                                                                                <table border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[3].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <!-- END Button -->
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                    <th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                                    <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[4].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="p30" style="padding:30px;">
                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                    <tr>
                                                                                        <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[4].jobType}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[4].jobDescription.substring(1,120)}...</td>
                                                                                    </tr>
                                                                                    <!-- Button -->
                                                                                    <tr>
                                                                                        <td align="left">
                                                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                                                <tr>
                                                                                                    <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[4].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <!-- END Button -->
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                                <th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                                <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[5].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="p30" style="padding:30px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[5].jobType}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[5].jobDescription.substring(1,120)}...</td>
                                                                                </tr>
                                                                                <!-- Button -->
                                                                                <tr>
                                                                                    <td align="left">
                                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[5].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <!-- END Button -->
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- END Columns -->
                                                    <!-- Columns -->
                                                    <tr>
                                                        <td>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[6].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="p30" style="padding:30px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[6].jobType}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[6].jobDescription.substring(1,120)}...</td>
                                                                                </tr>
                                                                                <!-- Button -->
                                                                                <tr>
                                                                                    <td align="left">
                                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[6].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <!-- END Button -->
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                            <th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                            <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[7].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="p30" style="padding:30px;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[7].jobType}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[7].jobDescription.substring(1,120)}...</td>
                                                                            </tr>
                                                                            <!-- Button -->
                                                                            <tr>
                                                                                <td align="left">
                                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[7].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <!-- END Button -->
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </th>
                                                        <th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                        <th class="column-top" width="210" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="${allJobs[8].imageUrl}" width="210" height="156" border="0" alt="" /></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="p30" style="padding:30px;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td class="h3 pb15" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:15px;">${allJobs[8].jobType}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;">${allJobs[8].jobDescription.substring(1,120)}...</td>
                                                                        </tr>
                                                                        <!-- Button -->
                                                                        <tr>
                                                                            <td align="left">
                                                                                <table border="0" cellspacing="0" cellpadding="0">
                                                                                    <tr>
                                                                                        <td class="text-button" style="background:#3267af; color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center;"><a href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${allJobs[8].jobId}" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Read More</span></a></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <!-- END Button -->
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </th>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- END Columns -->
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Three Columns -->
        
                                    <!-- CTA -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#3267af">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 50px 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h2 white center pb20" style="font-family:'Roboto', Arial,sans-serif; font-size:28px; line-height:34px; color:#ffffff; text-align:center; padding-bottom:20px;">List your real estate here</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text white center pb30" style="font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; color:#ffffff; text-align:center; padding-bottom:30px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <span class="m-hide"><br /></span>tempor incididunt ut labore et dolore magna aliqua.</td>
                                                                </tr>
                                                                <!-- Button -->
                                                                <tr>
                                                                    <td align="center">
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button text-button2" style="font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; background:#ffffff; color:#3267af;"><a href="#" target="_blank" class="link4" style="color:#3267af; text-decoration:none;"><span class="link4" style="color:#3267af; text-decoration:none;">Read More</span></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <!-- END Button -->
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END CTA -->
                                     
                                    <!-- Footer -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="padding-bottom: 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667640/email/pmbtajc6gx1mtfdrldrx.png" width="38" height="38" border="0" alt="" /></a></td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667639/email/iu7cxij55mvckk0prktt.jpg" width="38" height="38" border="0" alt="" /></a></td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667639/email/ihkxys3am0vjbiclp2ym.png" width="38" height="38" border="0" alt="" /></a></td>
                                                                    <td class="img" width="38" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="https://res.cloudinary.com/dnbfkk49e/image/upload/v1703667640/email/pvzoz0yg0xvi1v0cml3s.png" width="38" height="38" border="0" alt="" /></a></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer1 pb10" style="color:#999999; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">VetRelief.com - Post Jobs</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer2 pb30" style="color:#999999; font-family:'Roboto', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:30px;">East Pixel Bld. 99, Creative City 9000, Republic of Design</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer3" style="color:#c0c0c0; font-family:'Roboto', Arial,sans-serif; font-size:12px; line-height:18px; text-align:center;"><a href="#" target="_blank" class="link3-u" style="color:#c0c0c0; text-decoration:underline;"><span class="link3-u" style="color:#c0c0c0; text-decoration:underline;">Unsubscribe</span></a> from this mailing list.</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Footer -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        
                    `

                    const dataToSave = mustache.render(template, { imageUrl: allJobs[0].imageUrl });
                    fs.writeFileSync('template2.html', dataToSave);

                    // Send the generated HTML file as a response
                    res.set('Content-Type', 'text/html');
                    res.set('Content-Disposition', 'attachment; filename=template2.html');
                    res.send(dataToSave);
                })
                .catch(error => {
                    console.error(`Error fetching job listings: ${error.message}`);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(error => {
            console.error(`Error fetching job listings: ${error.message}`);
            res.status(500).send('Internal Server Error');
        });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
