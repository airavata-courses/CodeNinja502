sudo kubectl delete -f fetch_deployment_green.yaml
sudo kubectl delete -f fetch_service_green.yaml
sudo kubectl apply -f fetch_deployment_green.yaml
sudo kubectl apply -f fetch_service_green.yaml
