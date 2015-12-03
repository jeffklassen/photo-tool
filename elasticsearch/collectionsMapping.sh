
curl -XPUT 'http://192.168.1.41:9200/photo-tool/_mapping/collections' -d '
{
    "collections": {
		 "_timestamp": {
            "enabled": "true",
            "store": "yes"
        }
    }
}
'
