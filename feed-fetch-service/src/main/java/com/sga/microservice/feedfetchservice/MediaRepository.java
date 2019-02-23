package com.sga.microservice.feedfetchservice;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Iterator;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.ocpsoft.prettytime.PrettyTime;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MediaRepository {
	public MediaRepository() {
	}

	public String getURLS() {
		String res = null;
		final String PATH = "login.xml";
		final File fXmlFile = new File(PATH);
		if (fXmlFile.exists()) {
			final DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = null;
			try {
				dBuilder = dbFactory.newDocumentBuilder();
			} catch (final ParserConfigurationException e) {
				e.printStackTrace();
			}
			Document doc = null;
			try {
				doc = dBuilder.parse(fXmlFile);
			} catch (final SAXException e) {
				e.printStackTrace();
			} catch (final IOException e) {
				e.printStackTrace();
			}
			doc.getDocumentElement().normalize();

			final NodeList nList = doc.getElementsByTagName("mediaDB");
			final Node nNode = nList.item(0);

			if (nNode.getNodeType() == Node.ELEMENT_NODE) {

				final Element eElement = (Element) nNode;
				eElement.getAttribute("id");

				String clientURI = "mongodb://";
				final String clientURI1 = eElement.getElementsByTagName("clientURI1").item(0).getTextContent();

				final String clientURI2 = eElement.getElementsByTagName("clientURI2").item(0).getTextContent();

				final String clientURI3 = eElement.getElementsByTagName("clientURI3").item(0).getTextContent();

				final String clientURI4 = eElement.getElementsByTagName("clientURI4").item(0).getTextContent();

				clientURI = clientURI + clientURI1 + "@" + clientURI2 + "ssl=" + clientURI3 + "&" + clientURI4
						+ "=globaldb";
				final MongoClient client = new MongoClient(new MongoClientURI(clientURI));

				final String dbName = eElement.getElementsByTagName("dbName").item(0).getTextContent();
				final String collectionName = eElement.getElementsByTagName("collectionName").item(0).getTextContent();
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

			}
			return res;
		}

		return "Login Credentials Not Found";

	}

}
