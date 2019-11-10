package elasticsearch

import "github.com/aws/aws-sdk-go/aws/session"
import "github.com/aws/aws-sdk-go/service/elasticsearchservice"

var sess, err = session.NewSession()
var elasticSearch = elasticsearchservice.New(sess)
