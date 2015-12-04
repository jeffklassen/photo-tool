
curl -XPUT 'http://192.168.1.41:9200/photo-tool/_mapping/analysis' -d '
{
    "analysis": {
		 "_timestamp": {
            "enabled": "true",
            "store": "yes"
        }
    }
}
'
