package com.sga.microservice.feedfetchservice;

import java.util.Iterator;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

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
			BasicDBObject obj=new BasicDBObject();
			obj = (BasicDBObject) it.next();

			String a = obj.toJson();
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
