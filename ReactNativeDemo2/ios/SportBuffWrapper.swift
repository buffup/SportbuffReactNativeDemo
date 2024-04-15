//
//  Sport.swift
//  ReactNativeDemo2
//
//  Created by huda elhady on 28/04/2023.
//

import UIKit
import SportBuff

@objc(SportBuffWrapper)
class SportBuffWrapper: NSObject {
  
  private lazy var buffView: BuffView = {
    let buffContainerView = BuffView()

    buffContainerView.startStreamListener = { result in
      guard let success = result.success else {
        print(result.failure?.localizedDescription as Any)
        return
      }

      switch success.status {
      case .connected:
        print("connected")
      default:
        ()
      }
    }

    return buffContainerView
  }()
  
  @objc
  func initializeSportBuff() {
    setupUI()
    // you should add your client name here
    SportBuff.initialize(clientAccount: "sportbuff", anonymousLogin: false)
    showBuffView()
  }
  
  @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }
  
  private func showBuffView() {
    DispatchQueue.main.async {
      //you should provide either streamId or providerId
      self.buffView.startStream(streamId: "72a863ba-b444-4238-b969-4c3f9ba9af69",
                                externalId: nil)
    }
  }
  
  private func setupUI() {
    DispatchQueue.main.async { [weak self] in
      
      guard let self = self,
            let rootViewController = UIApplication.shared.windows.first?.rootViewController?.topMostViewController() else {
        return
      }
      self.buffView.translatesAutoresizingMaskIntoConstraints = false
      rootViewController.view.addSubview(self.buffView)
      
      NSLayoutConstraint.activate([
        self.buffView.leadingAnchor.constraint(equalTo: rootViewController.view.leadingAnchor),
        self.buffView.trailingAnchor.constraint(equalTo: rootViewController.view.trailingAnchor),
        self.buffView.topAnchor.constraint(equalTo: rootViewController.view.safeAreaLayoutGuide.topAnchor),
        self.buffView.bottomAnchor.constraint(equalTo: rootViewController.view.bottomAnchor, constant: -90)
      ])
    }
  }
}
