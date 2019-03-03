package com.sga.microservice.feedfetchservice;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;
import java.util.Iterator;

import org.apache.commons.lang3.StringUtils;
import org.ocpsoft.prettytime.PrettyTime;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MediaRepository {
	
	public MediaRepository() 
	{
		
	}

	public String getURLS() {
		String res = null;

		final String clientURI;// = "mongodb://projecthub1:L03TY9pAulwt6t85yGoPNracwgXgJnWiIfHBKEndePbPGibBK5CZ0e2Y9qMpqiILWz8XHfSxO6hpOTUfXXvHbQ==@projecthub1.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

		final String usernamepassword="http://127.0.0.1:8500/v1/kv/database/usernamepassword?raw";
		final String sitename="http://127.0.0.1:8500/v1/kv/database/site?raw";
		URL upass=null;
		URL site=null;
		String finalusernamepassword;
		String finalsitename;
		try {
			upass = new URL(usernamepassword);
			site = new URL(sitename);
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		StringBuilder result;
		StringBuilder result2;
		try {
			HttpURLConnection conn = (HttpURLConnection) upass.openConnection();
			conn.setRequestMethod("GET");
			result = new StringBuilder();
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}


			HttpURLConnection conn1 = (HttpURLConnection) site.openConnection();
			conn1.setRequestMethod("GET");
			result2 = new StringBuilder();
			BufferedReader rd1 = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
			String line1;
			while ((line1 = rd1.readLine()) != null) {
				result.append(line1);
			}
		}catch (Exception e){
			return (e.getMessage());
		}


		finalusernamepassword=result.toString();
		finalsitename = result2.toString();
		StringBuilder sb1 = new StringBuilder();

		sb1.append("mongodb://");

		sb1.append(finalusernamepassword);


		sb1.append(finalsitename);

		clientURI=sb1.toString();
		//System.out.println("skjhfdkjhdskufhlkdsahfudhflkuhdflkuhlkdhuflkahflkashdflkahdflkhdflkj");
		System.out.println(clientURI);

		final MongoClient client = new MongoClient(new MongoClientURI(clientURI));

		final String dbName = "MediaDB";// eElement.getElementsByTagName("dbName").item(0).getTextContent();
		final String collectionName = "media";// eElement.getElementsByTagName("collectionName").item(0).getTextContent();
		@SuppressWarnings(value = { "deprecation" })
		final DB db = client.getDB(dbName);
		final DBCollection collection = db.getCollection(collectionName);

		final DBCursor iterDoc = collection.find();
		final Iterator<?> it = iterDoc.iterator();

		final StringBuilder sb = new StringBuilder();
		sb.append("[");
		while (it.hasNext()) {
			BasicDBObject obj;
			obj = (BasicDBObject) it.next();

			String a = obj.toJson();
			final String datetemp = StringUtils.substringBetween(a, "\"date\" : \"", "\"");
			final long epoch = Long.parseLong(datetemp);

			final Calendar calendar = Calendar.getInstance();
			calendar.setTimeInMillis(epoch);

			final PrettyTime p = new PrettyTime();

			a = StringUtils.replacePattern(a, "[1-9][0-9]{11,20}", p.format(calendar));

			sb.append(a);
			sb.append(",");
		}
		sb.setLength(sb.length() - 1);
		sb.append("]");
		res = sb.toString();
		client.close();
		return res;

		/*
		 * String res = null; final String PATH = "login.xml"; final File fXmlFile = new
		 * File(PATH); if (fXmlFile.exists()) { final DocumentBuilderFactory dbFactory =
		 * DocumentBuilderFactory.newInstance(); DocumentBuilder dBuilder = null; try {
		 * dBuilder = dbFactory.newDocumentBuilder(); } catch (final
		 * ParserConfigurationException e) { e.printStackTrace(); } Document doc = null;
		 * try { doc = dBuilder.parse(fXmlFile); } catch (final SAXException e) {
		 * e.printStackTrace(); } catch (final IOException e) { e.printStackTrace(); }
		 * doc.getDocumentElement().normalize();
		 *
		 * final NodeList nList = doc.getElementsByTagName("mediaDB"); final Node nNode
		 * = nList.item(0);
		 *
		 * if (nNode.getNodeType() == Node.ELEMENT_NODE) {
		 *
		 * final Element eElement = (Element) nNode; eElement.getAttribute("id");
		 *
		 * String clientURI = "mongodb://"; final String clientURI1 =
		 * eElement.getElementsByTagName("clientURI1").item(0).getTextContent();
		 *
		 * final String clientURI2 =
		 * eElement.getElementsByTagName("clientURI2").item(0).getTextContent();
		 *
		 * final String clientURI3 =
		 * eElement.getElementsByTagName("clientURI3").item(0).getTextContent();
		 *
		 * final String clientURI4 =
		 * eElement.getElementsByTagName("clientURI4").item(0).getTextContent();
		 *
		 * clientURI = clientURI + clientURI1 + "@" + clientURI2 + "ssl=" + clientURI3 +
		 * "&" + clientURI4 + "=globaldb"; final MongoClient client = new
		 * MongoClient(new MongoClientURI(clientURI));
		 *
		 * final String dbName =
		 * eElement.getElementsByTagName("dbName").item(0).getTextContent(); final
		 * String collectionName =
		 * eElement.getElementsByTagName("collectionName").item(0).getTextContent();
		 *
		 * @SuppressWarnings(value = { "deprecation" }) final DB db =
		 * client.getDB(dbName); final DBCollection collection =
		 * db.getCollection(collectionName);
		 *
		 * final DBCursor iterDoc = collection.find(); final Iterator<?> it =
		 * iterDoc.iterator();
		 *
		 * final StringBuilder sb = new StringBuilder(); sb.append("["); while
		 * (it.hasNext()) { BasicDBObject obj; obj = (BasicDBObject) it.next();
		 *
		 * String a = obj.toJson(); final String datetemp =
		 * StringUtils.substringBetween(a, "\"date\" : \"", "\""); final long epoch =
		 * Long.parseLong(datetemp);
		 *
		 * final Calendar calendar = Calendar.getInstance();
		 * calendar.setTimeInMillis(epoch);
		 *
		 * final PrettyTime p = new PrettyTime();
		 *
		 * a = StringUtils.replacePattern(a, "[1-9][0-9]{11,20}", p.format(calendar));
		 *
		 * sb.append(a); sb.append(","); }
		 *
		 * sb.setLength(sb.length() - 1); sb.append("]"); res = sb.toString();
		 * client.close();
		 *
		 * } return res; }
		 *
		 * return "Login Credentials Not Found";
		 */

	}

}
