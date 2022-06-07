# react-native-gomin-ekyc

lib ekyc

## Installation

**yarn**: `yarn add git+https://github.com/phamtuan0946621237/react-native-gomin-ekyc.git`
## setting
* iOS
    - Podfile : 
        ```java
        permissions_path = '../node_modules/react-native-permissions/ios'
        pod 'RNEkyc', :path => '../node_modules/react-native-ekyc-sdk'
        pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
        pod 'Permission-Microphone', :path => "#{permissions_path}/Microphone"
        ```
    

    - Info.plist : 
        ```java
        <key>NSCameraUsageDescription</key>
        <string>Cần truy cập máy ảnh của bạn để chụp thêm ảnh và cập nhật ảnh hồ sơ.</string>
        <key>NSMicrophoneUsageDescription</key>
        <string>Cần truy cập micro của bạn để sử dụng tính năng</string>
        ```

    ##### Workaround for use_frameworks! issues If you use use_frameworks!, add this at the top of your Podfile, and uncomment the line corresponding to your CocoaPods version:
        ```java
        use_frameworks!
        pre_install do |installer|
        Pod::Installer::Xcode::TargetValidator.send(:define_method, :verify_no_static_framework_transitive_dependencies) {}

        installer.pod_targets.each do |pod|
            if pod.name.eql?('RNPermissions') || pod.name.start_with?('Permission-')
            def pod.build_type;
                # Uncomment the line corresponding to your CocoaPods version
                # Pod::BuildType.static_library # >= 1.9
                # Pod::Target::BuildType.static_library # < 1.9
            end
            end
        end
        end
        ```

    => pod install

* ANDROID
    - settings.gradle : 
        ```java
            include ':react-native-ekyc-sdk'
            project(':react-native-ekyc-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-ekyc-sdk/android')
            include ':ocr-sdk'
            project(':ocr-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-ekyc-sdk/android/ocr-sdk')
        ```
    - build.gradle :
        ```java
        dependencies {
            implementation fileTree(dir: "libs", include: ["*.jar"])
            //noinspection GradleDynamicVersion
            implementation "com.facebook.react:react-native:+"  // From node_modules

            implementation project(':react-native-ekyc-sdk')

            ...
        }
        ```
    - android/app/build.gradle :
        ```java
            android {
                ...
                aaptOptions { 
                    noCompress "tflite"
                    noCompress "lite"
                }
            }    
            ```
    - AndroidManifest.xml :     
        ```java
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO"/>
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        ```
        


## Usage
    import {ekyc} from 'react-native-gomin-ekyc'


    const EkycStack = ({token}: {token ?: string}) => {
        const onDoneStepFullEkyc = (value : any) => {
            console.log("Success : any",value)
        }
        return ekyc(token,onDoneStepFullEkyc)
    }

    <Stack.Navigator>
        ...
        <Stack.Screen name="EkycStack" component={() => <EkycStack token={props?.token} />} options={{ title: 'Home' }} />
    </Stack.Navigator>


##  Note : 
        - Thư viện là 1 stack và sử dụng : react-native-navigation
        - Hàm : ** ekyc(token,callback) => return Stack **
            
## EkycStack variable
            | variable | Type | Description |
            :------------ |:---------------| :-----|
            | **`token`** | `String` | truyền token để call đc toàn bộ api trong thư viện |
            | **`callback`** | `void` | 1 callback function được gọi khi hoàn thành toàn bộ luồng ekyc |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
# react-native-gomin-ekyc
