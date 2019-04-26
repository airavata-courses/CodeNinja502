sudo kubectl delete -f upload_service_green.yaml
sudo kubectl delete -f upload_deployment_green.yaml
sudo kubectl apply -f upload_service_green.yaml
sudo kubectl apply -f upload_deployment_green.yaml
