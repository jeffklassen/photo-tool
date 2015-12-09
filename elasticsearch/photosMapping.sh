
curl -XPUT 'http://192.168.1.41:9200/photo-tool/_mapping/photos' -d '
{
    "photos": {
		 "_timestamp": {
            "enabled": "true",
            "store": "yes"
        }
    }
}
'
