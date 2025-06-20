import React, { useRef, useState } from 'react';
import { 
  Image, 
  ImageSourcePropType, 
  Modal, 
  StyleSheet, 
  View, 
  useWindowDimensions,
  ScrollView,
  Dimensions
} from 'react-native';
import BoothOverlay from '@/components/BoothOverlay';
import { Booth, booths } from '@/data/booths';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const floorMap: ImageSourcePropType = require('../../../assets/images/floor-map.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FloorMapScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<Booth | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<Image>(null);

  // Calculate image dimensions while maintaining aspect ratio
  const onImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    const imageAspectRatio = width / height;
    const containerAspectRatio = containerSize.width / containerSize.height;
    
    let displayWidth, displayHeight;
    
    if (containerAspectRatio > imageAspectRatio) {
      // Container is wider than the image (relative to height)
      displayHeight = containerSize.height;
      displayWidth = displayHeight * imageAspectRatio;
    } else {
      // Container is taller than the image (relative to width)
      displayWidth = containerSize.width;
      displayHeight = displayWidth / imageAspectRatio;
    }
    
    setImageSize({ width: displayWidth, height: displayHeight });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        horizontal 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View 
          style={styles.mapContainer}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContainerSize({ width, height });
          }}
        >
          <Image
            ref={imageRef}
            source={floorMap}
            style={[
              styles.mapImage,
              {
                width: containerSize.width,
                height: imageSize.height > 0 
                  ? imageSize.height 
                  : containerSize.height,
              },
            ]}
            resizeMode="contain"
            onLoad={onImageLoad}
          />
          {imageSize.width > 0 &&
            booths.map((b) => (
              <BoothOverlay 
                key={b.id} 
                booth={b} 
                mapWidth={containerSize.width} 
                mapHeight={imageSize.height} 
                onPress={setSelected}
              />
            ))}
        </View>
      </ScrollView>

      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <ThemedText type="title">{selected?.name}</ThemedText>
            <ThemedText>{selected?.supplierInfo}</ThemedText>
            <ThemedText style={styles.close} onPress={() => setSelected(null)}>
              Close
            </ThemedText>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    backgroundColor: '#fff',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  close: {
    marginTop: 16,
    color: '#0a7ea4',
    alignSelf: 'flex-end',
  },
});
