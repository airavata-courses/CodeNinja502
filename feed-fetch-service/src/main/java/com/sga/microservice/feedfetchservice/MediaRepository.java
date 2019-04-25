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
	
	public MediaRepository() {}

	public String getURLS() {
		
		String res = null;

		//final String clientURI = "mongodb://projecthub2:7CUAuyH3zX6RhgQLuUw8afiSkzuk5gKphGl9omu9DUb6nj2JTITkkhjpvf9oHFHUYABMNwHivWkQHfz4JNrLUw==@projecthub2.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
		final String clientURI = "mongodb://projecthub:Ywu2W9vK2xHSjj8SvZOCi5x4pc1gMmKrpjI9bU3xtPDE0UcOR8uRcyfvCeQBxyN6dKPfaBA0qjtJme0dux9mjA==@projecthub.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
		final MongoClient client = new MongoClient(new MongoClientURI(clientURI));

		final String dbName = "MediaDB";           
		final String collectionName = "media";     
		
		@SuppressWarnings(value = { "deprecation" })
		final DB db = client.getDB(dbName);
		final DBCollection collection = db.getCollection(collectionName);

		final DBCursor iterDoc = collection.find();
		final Iterator<?> it = iterDoc.iterator();

		final StringBuilder sb = new StringBuilder();
		sb.append("[");
		while (it.hasNext()) 
		{
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
	}

}
