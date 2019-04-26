sudo kubectl delete -f upload_service_blue.yaml
sudo kubectl delete -f upload_deployment_blue.yaml
sudo kubectl apply -f upload_service_blue.yaml
sudo kubectl apply -f upload_deployment_blue.yaml
