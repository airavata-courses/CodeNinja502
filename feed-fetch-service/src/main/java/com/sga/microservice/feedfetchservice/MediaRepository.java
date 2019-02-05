package com.sga.microservice.feedfetchservice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.util.JSON;

public class MediaRepository{
	public MediaRepository() {}


	public List<String> getURLS() {
		//MongoClient client = new MongoClient("projecthub.documents.azure.com",10255); //with default server and port adress
		MongoClient client = new MongoClient(new MongoClientURI("mongodb://projecthub:uScHiw5Ahp7OSthjECegyWBi4iV0NdiuqOgTOLLYrysbZIvQ4Uh0XuGpJaCsOLWTNpsd2Czrb0xWduOTOF06Og==@projecthub.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"));

		DB db = client.getDB( "MediaDB" );
		DBCollection collection = db.getCollection("media");

		//DBObject dbo = collection.findOne();
		//String url = (String) dbo.get("URL");

		//img URL, desc, date, userID<email id>

		List<String>ans = new ArrayList<String>();

		//ans.add(url);
		//List<Media> data = new ArrayList<Media>();

		/*for (DBObject cur : collection.find()) {
		    System.out.println();
		    //data.add(new Media(cur))

		}*/

		DBCursor iterDoc = collection.find(); 


		Iterator<?> it = iterDoc.iterator(); 

		while (it.hasNext())
		{  
			BasicDBObject obj=new BasicDBObject();
			obj = (BasicDBObject) it.next();
			
			//System.out.println(it.next());  
			//System.out.println(obj.toJson());
			/*String value = obj.toJson();
			value = value.substring(1, value.length()-1);           //remove curly brackets
			String[] keyValuePairs = value.split(",");              //split the string to creat key-value pairs
			Map<String,String> map = new HashMap<>();               

			for(String pair : keyValuePairs)                        
			{
			    String[] entry = pair.split(":");                   
			    map.put(entry[0].trim(), entry[1].trim());          
			}*/
			
			/*for (Map.Entry<String, String> entry : map.entrySet()) {
			    System.out.println(entry.getKey()+" : "+entry.getValue());
			}*/
			//System.out.println(map.keySet().toString());
			//System.out.println(Arrays.asList(map));
			
			
		}
		return ans;
	}


}
