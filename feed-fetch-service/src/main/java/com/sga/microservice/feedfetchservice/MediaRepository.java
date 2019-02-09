package com.sga.microservice.feedfetchservice;


import java.util.Calendar;

import java.util.Iterator;


import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.apache.commons.lang3.StringUtils;
import org.ocpsoft.prettytime.PrettyTime;


public class MediaRepository{
	public MediaRepository() {}


	public String getURLS() {
		MongoClient client = new MongoClient(new MongoClientURI("mongodb://projecthub:uScHiw5Ahp7OSthjECegyWBi4iV0NdiuqOgTOLLYrysbZIvQ4Uh0XuGpJaCsOLWTNpsd2Czrb0xWduOTOF06Og==@projecthub.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"));

		@SuppressWarnings("deprecation")
		DB db = client.getDB( "MediaDB" );
		DBCollection collection = db.getCollection("media");

		DBCursor iterDoc = collection.find(); 
		Iterator<?> it = iterDoc.iterator(); 

		StringBuilder sb = new StringBuilder();
		sb.append("[");
		while (it.hasNext())
		{  
			BasicDBObject obj;
			obj = (BasicDBObject) it.next();

			String a = obj.toJson();
			String datetemp=StringUtils.substringBetween(a,"\"date\" : \"","\"");
			long epoch = Long.parseLong( datetemp );


			Calendar calendar = Calendar.getInstance();
			calendar.setTimeInMillis(epoch);


			PrettyTime p = new PrettyTime();

			a=StringUtils.replacePattern(a,"[1-9][0-9]{11,20}",p.format(calendar));



			sb.append(a);
			sb.append(",");
		}
		
		sb.setLength(sb.length() - 1);
		sb.append("]");
		String res = sb.toString();
		client.close();
		return res;
	}


}
