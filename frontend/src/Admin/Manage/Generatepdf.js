import { Document, Page, Text, View, StyleSheet,PDFDownloadLink } from '@react-pdf/renderer';
import { useState,useEffect } from 'react';

const styles = StyleSheet.create({
    page:{
        padding:30,
        fontSize:10,
        fontFamily:"Helvetica"
    },
    header:{
        marginBottom:25
    },
    title1:{
        fontSize:25,
        textAlign:"center",
        color:"blue",
        fontWeight:"bold",
        marginBottom:10
    },
    title2:{
        fontSize:15,
        textAlign:"center",
        color:"blue",
        marginBottom:20
    },
    table:{
        display:"table",
        width:"auto",
        marginTop:10
    },
    row:{
        flexDirection:"row",
        borderWidth: 1,
        borderColor: "black" ,
        padding:10
    },
    col1:{width:"10%"},
    col2:{width:"20%"},
    col3:{width:"15%"},
    col4:{width:"15%"},
    col5:{width:"15%"},
    col6:{width:"25%"},
    foot1:{width:"100%",textAlign:"center",fontWeight:"bold",color:"navy"}
}); 




function Generatepdf(){

    const[data,setdata] = useState([]);
    const date = new Date().toISOString()
    let count = 0;


    const userlist=async()=>{
         try{
              const res = await fetch("http://localhost:3002/userlist");
              const json = await res.json();
              setdata(json);
                }
                catch(err){
                    alert("failed to fetch data");
                }
            }
        
            useEffect(()=>{
                userlist();
            },[])

    const Mydoc = ()=>(
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title1}>User List</Text>
                    <Text style={styles.title2}>Report :</Text>
                </View> 
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.col1}>Sr.no</Text>
                        <Text style={styles.col2}>UserName</Text>
                        <Text style={styles.col3}>User Type</Text>
                        <Text style={styles.col4}>City</Text>
                        <Text style={styles.col5}>Contact</Text>
                        <Text style={styles.col6}>Email</Text>
                    </View>
                    {data && data.map((item,index)=>{
                        count++;
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.col1}>{index + 1}</Text>
                                <Text style={styles.col2}>{item.username}</Text>
                                <Text style={styles.col3}>{item.usertype}</Text>
                                <Text style={styles.col4}>{item.city}</Text>
                                <Text style={styles.col5}>{item.contact}</Text>
                                <Text style={styles.col6}>{item.email}</Text>
                            </View>
                        )
                    })}
                    <View style={styles.row}>
                        <Text style={styles.foot1}>Total User:{data.length}</Text>
                    </View>
                </View> 
            </Page>
        </Document>
    )
    return(
        <PDFDownloadLink document={<Mydoc/>} fileName='userlist.pdf'>
            {({loading})=>(loading ? "loading...." : "Download Pdf")}
        </PDFDownloadLink>
    );
}

export default Generatepdf;